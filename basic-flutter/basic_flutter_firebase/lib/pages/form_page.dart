import 'package:basic_flutter_firebase/models/student.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';

class FormPage extends StatefulWidget {
  const FormPage({Key? key}) : super(key: key);

  @override
  _FormPageState createState() => _FormPageState();
}

class _FormPageState extends State<FormPage> {
  final formKey = GlobalKey<FormState>();
  Student myStudent = Student();

  final Future<FirebaseApp> firebase = Firebase.initializeApp();

  final CollectionReference _studentCollection =
      FirebaseFirestore.instance.collection("students");

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
                appBar: AppBar(
                  title: const Text(
                    'แบบฟอร์มบันทึกคะแนนสอบ',
                  ),
                ),
                body: Container(
                    padding: const EdgeInsets.all(20),
                    child: Form(
                      key: formKey,
                      child: SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('ชื่อ', style: TextStyle(fontSize: 20)),
                            TextFormField(
                              validator:
                                  RequiredValidator(errorText: 'required'),
                              onSaved: (String? fname) {
                                myStudent.fname = fname;
                              },
                            ),
                            const SizedBox(
                              height: 15,
                            ),
                            const Text('นามสกุล',
                                style: TextStyle(fontSize: 20)),
                            TextFormField(
                              validator:
                                  RequiredValidator(errorText: 'required'),
                              onSaved: (String? lname) {
                                myStudent.lname = lname;
                              },
                            ),
                            const SizedBox(
                              height: 15,
                            ),
                            const Text('อีเมลล์',
                                style: TextStyle(fontSize: 20)),
                            TextFormField(
                              validator: MultiValidator([
                                RequiredValidator(errorText: 'required'),
                                EmailValidator(
                                    errorText: 'email is in wrong format'),
                              ]),
                              onSaved: (String? email) {
                                myStudent.email = email;
                              },
                              keyboardType: TextInputType.emailAddress,
                            ),
                            const SizedBox(
                              height: 15,
                            ),
                            const Text('คะแนน', style: TextStyle(fontSize: 20)),
                            TextFormField(
                              validator:
                                  RequiredValidator(errorText: 'required'),
                              onSaved: (String? score) {
                                myStudent.score = score;
                              },
                              keyboardType: TextInputType.number,
                            ),
                            SizedBox(
                                width: double.infinity,
                                child: ElevatedButton(
                                    onPressed: () async {
                                      if (formKey.currentState!.validate()) {
                                        formKey.currentState?.save();
                                        try {
                                          await _studentCollection.add({
                                            'fname': myStudent.fname,
                                            'lname': myStudent.lname,
                                            'email': myStudent.email,
                                            'score': myStudent.score,
                                          });
                                        } catch (e) {
                                          print(e);
                                        }
                                        formKey.currentState?.reset();
                                      }
                                    },
                                    child: const Text('บันทึก',
                                        style: TextStyle(fontSize: 20)))),
                          ],
                        ),
                      ),
                    )));
          }

          return const Scaffold(
              body: Center(child: CircularProgressIndicator()));
        });
  }
}
