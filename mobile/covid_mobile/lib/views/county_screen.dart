import 'package:flutter/material.dart';

class CountyScreen extends StatefulWidget{
  @override 
  _CountyScreen createState() => _CountyScreen(); 
}

class _CountyScreen extends State<CountyScreen> {

  @override
  Widget build(BuildContext context) {
    final Map arguments = ModalRoute.of(context).settings.arguments as Map;
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(arguments['countyName']),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: <Color>[
                Color.fromRGBO(127, 127, 213, 1),
                Color.fromRGBO(134, 168, 231, 1)
              ]
            )
          ),
        ),
      ),
      body: Center(child: Text(arguments['infected'].toString()))
    );
  }  
}