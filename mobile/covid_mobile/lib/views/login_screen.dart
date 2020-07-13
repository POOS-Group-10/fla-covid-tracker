import 'package:covid_mobile/services/auth/auth.dart';
import 'package:covid_mobile/services/auth/auth_service_implementation.dart';
import 'package:covid_mobile/services/counties/county_service.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:flutter/material.dart';

class LogInScreen extends StatefulWidget{
  @override 
  _LogInScreen createState() => _LogInScreen(); 
}

class _LogInScreen extends State<LogInScreen> {

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final AuthService _authService = serviceLocator<AuthService>();


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Log In")
      ),
      body: _buildLogIn(),
    );
  }

  Widget _buildLogIn(){
    return SafeArea(
      child: Container(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          children: <Widget>[
            Container(
              padding: EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 0),
              child: TextField(
              controller: _emailController,
              decoration: InputDecoration(labelText: 'Email')
              ) 
            ),
            Container(
              padding: EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 0),
              child: TextField(
              controller: _passwordController,
              obscureText: true,
              decoration: InputDecoration(labelText: 'Password'),
              ),
            ),
            Container(
              height: 50, 
              padding: EdgeInsets.fromLTRB(10.0, 20.0, 10.0, 0),
              child: RaisedButton(
                child: Text('Login'),
                onPressed: () async {
                  var res = await _authService.signIn(_emailController.text, _passwordController.text);
                  if (res == null){
                    showDialog(
                      context: context, 
                      builder: (context) => AlertDialog(
                        title: Text("Error"),
                        content: Text("You username or password is incorrect!")
                      )
                    );
                    return; 
                  }else{
                    Navigator.pushReplacementNamed(context, '/home');
                  }
                }
              )
            )
          ],
        ),
      )
    );
  }
  
}