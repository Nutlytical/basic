import 'package:basic_flutter_authentication/pages/home_page.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class WelcomePage extends StatelessWidget {
  WelcomePage({Key? key}) : super(key: key);

  final auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("ยินดีต้อนรับ")),
        body: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Center(
            child: Column(
              children: [
                Text(auth.currentUser!.email.toString(),
                    style: const TextStyle(fontSize: 25)),
                ElevatedButton(
                  child: const Text('ออกจากระบบ'),
                  onPressed: () {
                    auth.signOut().then((value) => {
                          Navigator.pushReplacement(context,
                              MaterialPageRoute(builder: (context) {
                            return const HomePage();
                          }))
                        });
                  },
                )
              ],
            ),
          ),
        ));
  }
}
