import 'package:basic_flutter_database/main.dart';
import 'package:basic_flutter_database/models/transactions.dart';
import 'package:basic_flutter_database/providers/transaction_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class FormPage extends StatelessWidget {
  const FormPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final formKey = GlobalKey<FormState>();
    final titleController = TextEditingController();
    final amountController = TextEditingController();

    return Scaffold(
        appBar: AppBar(title: const Text('แบบฟอร์มบันทึกข้อมูล')),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: formKey,
            child: Column(
              children: [
                TextFormField(
                    decoration: const InputDecoration(labelText: 'ชื่อรายการ'),
                    autofocus: false,
                    controller: titleController,
                    validator: (str) {
                      if (str!.isEmpty) {
                        return 'กรุณาป้อนชื่อรายการ';
                      }
                      return null;
                    }),
                TextFormField(
                    decoration: const InputDecoration(labelText: 'จำนวนเงิน'),
                    keyboardType: TextInputType.number,
                    controller: amountController,
                    validator: (str) {
                      if (str!.isEmpty) {
                        return 'กรุณาป้อนจำนวนเงิน';
                      } else if (double.parse(str) <= 0) {
                        return 'กรุณาป้อนตัวเลขมากกว่า 0';
                      }

                      return null;
                    }),
                TextButton(
                  onPressed: () {
                    if (formKey.currentState!.validate()) {
                      // ดึงค่าจาก input
                      var title = titleController.text;
                      var amount = amountController.text;

                      // เตรียมข้อมูล
                      Transactions statement = Transactions(
                          title: title,
                          amount: double.parse(amount),
                          date: DateTime.now());

                      // เรียกใช้ provider
                      var provider = Provider.of<TransactionProvider>(context,
                          listen: false);
                      provider.addTransaction(statement);

                      // Navigator.pop(context);
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              fullscreenDialog: true,
                              builder: (context) {
                                return const MyTapBarView();
                              }));
                    }
                  },
                  child: const Text(
                    'เพิ่มข้อมูล',
                    style: TextStyle(color: Colors.white, fontSize: 15),
                  ),
                  style:
                      TextButton.styleFrom(backgroundColor: Colors.green[400]),
                )
              ],
            ),
          ),
        ));
  }
}
