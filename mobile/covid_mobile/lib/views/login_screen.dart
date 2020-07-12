import 'package:flutter/material.dart';

class LogInScreen extends StatefulWidget{
  @override 
  _LogInScreen createState() => _LogInScreen(); 
}

class _LogInScreen extends State<LogInScreen> {

  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();


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
            TextField(
              controller: _usernameController,
              decoration: InputDecoration(labelText: 'Username')
            ), 
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: 'Password'),
            )
          ],
        ),
      )
    );
  }
  
}