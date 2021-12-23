import 'package:basic_flutter_authentication/models/profile.dart';
import 'package:basic_flutter_authentication/pages/welcome_page.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:form_field_validator/form_field_validator.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
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
              appBar: AppBar(title: const Text('เข้าสู่ระบบ')),
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
                                child: const Text('ลงชื่อเข้าใช้',
                                    style: TextStyle(fontSize: 20)),
                                onPressed: () async {
                                  if (formKey.currentState!.validate()) {
                                    formKey.currentState?.save();
                                    try {
                                      await FirebaseAuth.instance
                                          .signInWithEmailAndPassword(
                                              email: profile.email.toString(),
                                              password:
                                                  profile.password.toString())
                                          .then((value) {
                                        formKey.currentState?.reset();
                                        Navigator.pushReplacement(context,
                                            MaterialPageRoute(
                                                builder: (context) {
                                          return WelcomePage();
                                        }));
                                      });
                                    } on FirebaseAuthException catch (e) {
                                      Fluttertoast.showToast(
                                          msg: e.message.toString(),
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
