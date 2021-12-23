import 'package:basic_flutter_authentication/pages/login_page.dart';
import 'package:basic_flutter_authentication/pages/register_page.dart';
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('Register/Login')),
        body: Padding(
          padding: const EdgeInsets.fromLTRB(10, 50, 10, 0),
          child: SingleChildScrollView(
            child: Column(
              children: [
                Image.asset('assets/images/logo.jpg'),
                SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.add),
                      label: const Text('สร้างบัญชีผู้ใช้',
                          style: TextStyle(fontSize: 20)),
                      onPressed: () {
                        Navigator.pushReplacement(context,
                            MaterialPageRoute(builder: (context) {
                          return const RegisterPage();
                        }));
                      },
                    )),
                SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.login),
                      label: const Text('เข้าสู่ระบบ',
                          style: TextStyle(fontSize: 20)),
                      onPressed: () {
                        Navigator.pushReplacement(context,
                            MaterialPageRoute(builder: (context) {
                          return const LoginPage();
                        }));
                      },
                    )),
              ],
            ),
          ),
        ));
  }
}
