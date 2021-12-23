import 'package:basic_flutter_database/pages/form_page.dart';
import 'package:basic_flutter_database/providers/transaction_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'pages/home_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) {
          return TransactionProvider();
        })
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: const MyTapBarView(),
      ),
    );
  }
}

class MyTapBarView extends StatefulWidget {
  const MyTapBarView({Key? key}) : super(key: key);

  @override
  _MyTapBarViewState createState() => _MyTapBarViewState();
}

class _MyTapBarViewState extends State<MyTapBarView> {
  @override
  Widget build(BuildContext context) {
    return const DefaultTabController(
        length: 2,
        child: Scaffold(
          backgroundColor: Colors.blue,
          body: TabBarView(
            children: [HomePage(), FormPage()],
          ),
          bottomNavigationBar: TabBar(tabs: [
            Tab(icon: Icon(Icons.list), text: 'รายการธุรกรรม'),
            Tab(icon: Icon(Icons.add), text: 'บันทึกข้อมูล'),
          ]),
        ));
  }
}
