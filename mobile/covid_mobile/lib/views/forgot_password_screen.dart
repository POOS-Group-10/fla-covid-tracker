import 'package:covid_mobile/services/auth/auth.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:flutter/material.dart';

class PasswordScreen extends StatefulWidget {
  @override
  _PasswordScreen createState() => _PasswordScreen();
}

class _PasswordScreen extends State<PasswordScreen> {
  final TextEditingController _emailController = TextEditingController();
  final AuthService _authService = serviceLocator<AuthService>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text("Reset Password",
              style: TextStyle(
                color: Colors.white,
              )),
          flexibleSpace: Container(
            decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: <Color>[
                  Color.fromRGBO(127, 127, 213, 1),
                  Color.fromRGBO(134, 168, 231, 1)
                ])),
          )),
      body: _resetPassword(),
    );
  }

  Widget _resetPassword() {
    return SafeArea(
      child: Container(
        child: Column(
          children: <Widget>[
            Container(
                padding: EdgeInsets.fromLTRB(40.0, 250.0, 40.0, 0),
                child: TextField(
                    controller: _emailController,
                    decoration: InputDecoration(labelText: 'Email'))),
            resetButton()
          ],
        ),
      ),
    );
  }

  Widget resetButton() {
    return Container(
        height: 50,
        padding: EdgeInsets.fromLTRB(10.0, 20.0, 10.0, 0),
        child: RaisedButton(
            child: Text('Reset'),
            onPressed: () async {
              print("HEREEE");
              var res =
                  await _authService.forgotPassword(_emailController.text);
              if (res == null) {
                showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                        title: Text("Password Reset Sent!"),
                        content: Text(
                            "That Email Is Not Linked To A Fla-Covid-Tracking Account!")));
                return;
              } else {
                showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                        title: Text("Reset Password Sent!"), content: Text("Please Check Your Email.")));
              }
            }));
  }
}
