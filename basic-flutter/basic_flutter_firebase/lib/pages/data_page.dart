import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class DataPage extends StatefulWidget {
  const DataPage({Key? key}) : super(key: key);

  @override
  _DataPageState createState() => _DataPageState();
}

class _DataPageState extends State<DataPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('ผลคะแนนสอบ')),
        body: StreamBuilder(
          stream: FirebaseFirestore.instance.collection('students').snapshots(),
          builder: (context, AsyncSnapshot<QuerySnapshot> snapshot) {
            if (!snapshot.hasData) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
            return ListView(
              children: snapshot.data!.docs.map((DocumentSnapshot document) {
                return ListTile(
                  leading: CircleAvatar(
                      radius: 30,
                      child: FittedBox(child: Text(document['score']))),
                  title: Text(document['fname'] + document['lname']),
                  subtitle: Text(document['email']),
                );
              }).toList(),
            );
          },
        ));
  }
}
