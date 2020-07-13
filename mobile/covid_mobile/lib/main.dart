import 'dart:async';

import 'package:covid_mobile/views/county_screen.dart';
import 'package:covid_mobile/views/login_screen.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter/material.dart';
import 'package:covid_mobile/views/home_screen.dart';
import 'package:covid_mobile/views/search_screen.dart';
import 'package:covid_mobile/views/map_screen.dart';
import 'package:covid_mobile/services/service_locator.dart';

void main() {
  setupServiceLocator();
  runApp(MyApp());
}

// Add login here => once logged in route to home screen

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'COVID-19 Tracker',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: LogInScreen(),
      routes: <String, WidgetBuilder> {
        '/map': (BuildContext context) => MapScreen(),
        '/list': (BuildContext context) => SearchScreen(),
        '/county_screen': (BuildContext context) => CountyScreen()
      }
    );
  }
}
