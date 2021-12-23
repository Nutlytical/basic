import 'package:basic_flutter_database/models/transactions.dart';
import 'package:basic_flutter_database/pages/form_page.dart';
import 'package:basic_flutter_database/providers/transaction_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
    Provider.of<TransactionProvider>(context, listen: false).initData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('แอพบัญชี'), actions: [
          IconButton(
              onPressed: () {
                // Navigator.push(context, MaterialPageRoute(builder: (context) {
                //   return const FormPage();
                // }));
                SystemNavigator.pop();
              },
              icon: const Icon(Icons.exit_to_app))
        ]),
        body:
            Consumer<TransactionProvider>(builder: (context, provider, child) {
          var count = provider.transaction.length;

          if (count <= 0) {
            return const Center(
                child: Text('ไม่พบข้อมูล', style: TextStyle(fontSize: 35)));
          } else {
            return ListView.builder(
                itemCount: count,
                itemBuilder: (context, int index) {
                  Transactions data = provider.transaction[index];
                  return Card(
                      elevation: 3,
                      margin: const EdgeInsets.symmetric(
                          vertical: 5, horizontal: 10),
                      child: ListTile(
                          leading: CircleAvatar(
                              radius: 30,
                              child: FittedBox(
                                  child: Text(data.amount.toString()))),
                          title: Text(data.title.toString()),
                          subtitle: Text(DateFormat.yMEd().format(data.date))));
                });
          }
        }));
  }
}
