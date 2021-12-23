import 'package:basic_flutter_firebase/pages/data_page.dart';
import 'package:basic_flutter_firebase/pages/form_page.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return const DefaultTabController(
      length: 2,
      child: Scaffold(
          body: TabBarView(
            children: [FormPage(), DataPage()],
          ),
          backgroundColor: Colors.blue,
          bottomNavigationBar: TabBar(
            tabs: [
              Tab(text: 'บันทึกคะแนนสอบ'),
              Tab(text: 'รายชื่อนักเรียน'),
            ],
          )),
    );
  }
}
