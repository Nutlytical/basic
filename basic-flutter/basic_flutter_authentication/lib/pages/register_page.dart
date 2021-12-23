import 'package:basic_flutter_authentication/models/profile.dart';
import 'package:basic_flutter_authentication/pages/home_page.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:form_field_validator/form_field_validator.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({Key? key}) : super(key: key);

  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final formKey = GlobalKey<FormState>();
  Profile profile = Profile();
  final Future<FirebaseApp> firebase = Firebase.initializeApp();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: firebase,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Scaffold(
                appBar: AppBar(
                  title: const Text('Error'),
                ),
                body: Center(child: Text('${snapshot.error}')));
          }
          if (snapshot.connectionState == ConnectionState.done) {
            return Scaffold(
              appBar: AppBar(title: const Text('สร้างบัญชีผู้ใช้')),
              body: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Form(
                    key: formKey,
                    child: SingleChildScrollView(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('อีเมลล์', style: TextStyle(fontSize: 20)),
                          TextFormField(
                            keyboardType: TextInputType.emailAddress,
                            validator: MultiValidator([
                              RequiredValidator(errorText: 'Email is required'),
                              EmailValidator(
                                  errorText: 'Email is in wrong format')
                            ]),
                            onSaved: (String? email) {
                              profile.email = email;
                            },
                          ),
                          const SizedBox(height: 15),
                          const Text('รหัสผ่าน',
                              style: TextStyle(fontSize: 20)),
                          TextFormField(
                            obscureText: true,
                            validator: RequiredValidator(
                                errorText: 'Password is required'),
                            onSaved: (String? password) {
                              profile.password = password;
                            },
                          ),
                          SizedBox(
                              width: double.infinity,
                              child: ElevatedButton(
                                child: const Text('ลงทะเบียน',
                                    style: TextStyle(fontSize: 20)),
                                onPressed: () async {
                                  if (formKey.currentState!.validate()) {
                                    formKey.currentState?.save();
                                    try {
                                      await FirebaseAuth.instance
                                          .createUserWithEmailAndPassword(
                                              email: profile.email.toString(),
                                              password:
                                                  profile.password.toString())
                                          .then((value) {
                                        Fluttertoast.showToast(
                                            msg: 'Success 🚀',
                                            toastLength: Toast.LENGTH_SHORT,
                                            gravity: ToastGravity.CENTER,
                                            timeInSecForIosWeb: 2,
                                            backgroundColor: Colors.green,
                                            textColor: Colors.white,
                                            fontSize: 16.0);
                                        Navigator.pushReplacement(context,
                                            MaterialPageRoute(
                                                builder: (context) {
                                          return const HomePage();
                                        }));
                                      });
                                    } on FirebaseAuthException catch (e) {
                                      String? message;
                                      if (e.code == 'weak-password') {
                                        message =
                                            'รหัสผ่านต้องมีความยาวเกิน 6 ตัวอักษร';
                                      } else if (e.code ==
                                          'email-already-in-use') {
                                        message =
                                            'มีอีเมลล์นี้ในระบบแล้ว โปรดใช้อีเมลล์อื่น';
                                      } else {
                                        message = e.message;
                                      }
                                      Fluttertoast.showToast(
                                          msg: message.toString(),
                                          toastLength: Toast.LENGTH_SHORT,
                                          gravity: ToastGravity.CENTER,
                                          timeInSecForIosWeb: 2,
                                          backgroundColor: Colors.red,
                                          textColor: Colors.white,
                                          fontSize: 16.0);
                                    } catch (e) {
                                      print(e);
                                    }
                                    formKey.currentState?.reset();
                                  }
                                },
                              )),
                        ],
                      ),
                    )),
              ),
            );
          }
          return const Scaffold(body: CircularProgressIndicator());
        });
  }
}
