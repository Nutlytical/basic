import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class MoneyBox extends StatelessWidget {
  // const MoneyBox({Key? key, this.title, this.amount, this.color, this.height})
  // : super(
  //     key: key,
  //   );

  // final String? title;
  // final double? amount;
  // final Color? color;
  // final double? height;

  MoneyBox(this.title, this.amount, this.color, this.height, {Key? key})
      : super(
          key: key,
        );

  String title;
  double amount;
  Color color;
  double height;

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.all(20.0),
        decoration: BoxDecoration(
            color: color, borderRadius: BorderRadius.circular(10)),
        height: height,
        child: Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
          Text(title.toString(),
              style: const TextStyle(
                  fontSize: 25,
                  color: Colors.white,
                  fontWeight: FontWeight.bold)),
          Expanded(
            child: Text(
              NumberFormat("#,###.##").format(amount),
              style: const TextStyle(
                  fontSize: 25,
                  color: Colors.white,
                  fontWeight: FontWeight.bold),
              textAlign: TextAlign.right,
            ),
          )
        ]));
  }
}
