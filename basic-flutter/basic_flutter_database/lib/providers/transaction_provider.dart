import 'package:basic_flutter_database/database/transaction_db.dart';
import 'package:basic_flutter_database/models/transactions.dart';
import 'package:flutter/foundation.dart';

class TransactionProvider with ChangeNotifier {
  List<Transactions> transaction = [];

  List<Transactions> getTransactions() {
    return transaction;
  }

  void initData() async {
    var db = TransactionDb(dbName: 'transaction.db');

    // ดึงข้อมูลมาแสดงผล
    transaction = await db.loadAllData();
    notifyListeners();
  }

  void addTransaction(Transactions statement) async {
    var db = TransactionDb(dbName: 'transaction.db');

    // บันทึกข้อมูล
    await db.insertData(statement);

    // ดึงข้อมูลมาแสดงผล
    transaction = await db.loadAllData();

    // แจ้งเตือน Consumer
    notifyListeners();
  }
}
