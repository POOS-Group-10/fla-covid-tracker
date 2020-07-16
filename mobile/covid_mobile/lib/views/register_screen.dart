import 'package:covid_mobile/services/auth/auth.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:flutter/material.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreen createState() => _RegisterScreen();
}

class _RegisterScreen extends State<RegisterScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _firstController = TextEditingController();
  final TextEditingController _lastController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _countyController = TextEditingController();

  final AuthService _authService = serviceLocator<AuthService>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text("Register",
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
      body: _buildRegister(),
    );
  }

  Widget _buildRegister() {
    return SafeArea(
        child: Container(
      padding: const EdgeInsets.fromLTRB(10.0, 120.0, 10.0, 0),
      child: Column(
        children: <Widget>[
          Container(
              padding: EdgeInsets.fromLTRB(40.0, 10.0, 40.0, 0),
              child: TextField(
                  controller: _usernameController,
                  decoration: InputDecoration(labelText: 'Username'))),
          Container(
            padding: EdgeInsets.fromLTRB(40.0, 10.0, 40.0, 0),
            child: TextField(
              controller: _passwordController,
              obscureText: true,
              decoration: InputDecoration(labelText: 'Password'),
            ),
          ),
          Container(
              padding: EdgeInsets.fromLTRB(40.0, 10.0, 40.0, 0),
              child: TextField(
                controller: _firstController,
                decoration: InputDecoration(labelText: 'First Name'),
              )),
          Container(
              padding: EdgeInsets.fromLTRB(40.0, 10.0, 40.0, 0),
              child: TextField(
                controller: _lastController,
                decoration: InputDecoration(labelText: 'Last Name'),
              )),
          Container(
              padding: EdgeInsets.fromLTRB(40.0, 10.0, 40.0, 0),
              child: TextField(
                controller: _emailController,
                decoration: InputDecoration(labelText: 'Email'),
              )),
          Container(
              padding: EdgeInsets.fromLTRB(40.0, 10.0, 40.0, 0),
              child: TextField(
                controller: _countyController,
                decoration: InputDecoration(labelText: 'County'),
              )),
          registerButton(),
        ],
      ),
    ));
  }

  Widget registerButton() {
    return Container(
        height: 50,
        padding: EdgeInsets.fromLTRB(10.0, 20.0, 10.0, 0),
        child: RaisedButton(
            child: Text('Register'),
            onPressed: () async {
              print("HEREEE");
              var res = await _authService.register(
                  _usernameController.text, 
                  _passwordController.text, 
                  _firstController.text, 
                  _lastController.text,
                  _emailController.text,
                  _countyController.text);
              if (res == null) {
                showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                        title: Text("Error"),
                        content:
                            Text("Try Again!")));
                return;
              } else{
                  showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                        title: Text("Registration Successful!"),
                        content:
                            Text("Log in!")));
              }
            }));
  }
}
