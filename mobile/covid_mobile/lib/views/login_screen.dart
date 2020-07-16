import 'package:covid_mobile/services/auth/auth.dart';
import 'package:covid_mobile/services/auth/auth_service_implementation.dart';
import 'package:covid_mobile/services/counties/county_service.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:flutter/material.dart';

class LogInScreen extends StatefulWidget {
  @override
  _LogInScreen createState() => _LogInScreen();
}

class _LogInScreen extends State<LogInScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final AuthService _authService = serviceLocator<AuthService>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text("Log In",
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
      body: _buildLogIn(),
    );
  }

  Widget _buildLogIn() {
    return SafeArea(
        child: Container(
      padding: const EdgeInsets.fromLTRB(10.0, 170.0, 10.0, 0),
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
          loginButton(),
          registerButton(),
          forgotPasswordButton()
        ],
      ),
    ));
  }

  Widget loginButton() {
    return Container(
        height: 50,
        padding: EdgeInsets.fromLTRB(10.0, 20.0, 10.0, 0),
        child: RaisedButton(
            child: Text('Login'),
            onPressed: () async {
              print("HEREEE");
              var res = await _authService.signIn(
                  _usernameController.text, _passwordController.text);
              if (res == null) {
                showDialog(
                    context: context,
                    builder: (context) => AlertDialog(
                        title: Text("Error"),
                        content:
                            Text("You username or password is incorrect!")));
                return;
              } else {
                // var s = _authService.getCookies();
                Navigator.pushReplacementNamed(context, '/home');
              }
            }));
  }

  Widget registerButton() {
    return InkWell(
        onTap: () {
          Navigator.pushNamed(context, '/register');
        },
        child: new Padding(
            padding: EdgeInsets.fromLTRB(0, 40.0, 0, 0),
            child: Text("Don't have an account? Sign Up")));
  }

   Widget forgotPasswordButton() {
    return InkWell(
        onTap: () {
          Navigator.pushNamed(context, '/forgot');
        },
        child: new Padding(
            padding: EdgeInsets.fromLTRB(0, 20.0, 0, 0),
            child: Text("Forgot your password?")));
  }


}
