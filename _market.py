from _utility import *

def market_typeids():
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    sql = '''SELECT
      tracking."typeID"
    FROM
      market.tracking
    WHERE tracking.enabled = 1
    '''
    cursor.execute(sql, )
    results = cursor.fetchall()
    if results == None:
            return 0
    else:
        return results


def market_regionids():
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    sql = '''SELECT
      region."regionID"
    FROM
      market.region
    WHERE region.enabled = 1 AND
    region."importResult" = 0
    ORDER BY rank ASC
    '''
    cursor.execute(sql, )
    results = cursor.fetchall()
    if results == None:
        return 0
    else:
        return results


def market_setimportresult(regionID, importResult):
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    sql = '''UPDATE market.tracking
            SET "importResult" = %s
            WHERE tracking."regionID" = %s'''
    data = (importResult, regionID, )
    cursor.execute(sql, data, )
    conn.commit()
    conn.close()
    return 0


#
# Input     regionIDs, typeIDs
# Get       CREST market history
# Output    database insert
#
def market_getcrestdata(regionID, typeID):
    eve = pycrest.EVE()
    start_time = time.time()
    url = "https://public-crest.eveonline.com/market/" + str(regionID) + "/types/" + str(typeID) + "/history/"
    try:
        history = eve.get(url)
    except Exception:
        timemark = arrow.utcnow().format('YYYY-MM-DD HH:mm:ss')
        log = "[typeID:" + str(typeID) + "][regionID:" + str(regionID) + "] Exception"
        insertlog("consumer_markethistory.py", 5, log, timemark)
        return 0
    else:
        count = market_insertrecord(regionID, typeID, history)
        timemark = arrow.utcnow().format('YYYY-MM-DD HH:mm:ss')
        log = "[typeID:" + str(typeID) + "][regionID:" + str(regionID) + "] insert: " + str(count) + " @ " + str(round(count/(time.time() - start_time), 2)) + " rec/sec"
        insertlog("consumer_markethistory.py", 0, log, timemark)
        return count

#
# Input     CREST market history
# Output    Database insert

def market_insertrecord(regionID, typeID, history):
    count = 0
    for row in history['items']:
        volume = row['volume']
        orderCount = row['orderCount']
        lowPrice = row['lowPrice']
        highPrice = row['highPrice']
        avgPrice = row['avgPrice']
        timestamp = row['date']
        try:
            conn = psycopg2.connect(conn_string)
            cursor = conn.cursor()
            sql = '''INSERT INTO market.history ("typeID", "regionID", timestamp,
             "volume", "orderCount", "lowPrice",
              "highPrice", "avgPrice")
              VALUES (%s, %s, %s, %s, %s, %s, %s, %s)'''
            data = (typeID, regionID, timestamp, volume, orderCount, lowPrice, highPrice, avgPrice, )
            cursor.execute(sql, data, )
        except psycopg2.IntegrityError:
            conn.rollback()
        else:
            conn.commit()
            count += 1
    return count