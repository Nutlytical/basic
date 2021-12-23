import 'dart:io';

import 'package:basic_flutter_database/models/transactions.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sembast/sembast.dart';
import 'package:sembast/sembast_io.dart';

class TransactionDb {
  String dbName;

  TransactionDb({required this.dbName});

  // dbName = transaction.db
  // dbLocation =
  //     computer c:/users/user/transaction.db
  //     mobile /data/user/0/com.example.basic_flutter_database/app_flutter/transaction.db

  Future<Database> openDatabase() async {
    // หาตำแหน่งที่จะเก็บข้อมูล
    Directory appDirectory = await getApplicationDocumentsDirectory();
    String dbLocation = join(appDirectory.path, dbName);

    // create database
    DatabaseFactory dbFactory = databaseFactoryIo;
    Database db = await dbFactory.openDatabase(dbLocation);

    return db;
  }

  // บันทึกข้อมูล
  Future<int> insertData(Transactions statement) async {
    // database => store || database/store
    // transaction.db => expense || transaction.db/expense
    var databaseClient = await openDatabase();
    var store = intMapStoreFactory.store('expense');

    // json
    var keyId = store.add(databaseClient, {
      "title": statement.title,
      "amount": statement.amount,
      "date": statement.date.toIso8601String(),
    });
    databaseClient.close();

    return keyId;
  }

  // ดึงข้อมูล
  Future<List<Transactions>> loadAllData() async {
    var databaseClient = await openDatabase();
    var store = intMapStoreFactory.store('expense');
    var snapshot = await store.find(databaseClient,
        finder:
            Finder(sortOrders: [SortOrder(Field.key, false)])); // new to old
    List<Transactions> transactionList = <Transactions>[];

    for (var record in snapshot) {
      transactionList.add(Transactions(
        title: record['title'].toString(),
        amount: double.parse(record['amount'].toString()),
        date: DateTime.parse(record['date'].toString()),
      ));
    }

    return transactionList;
  }
}
