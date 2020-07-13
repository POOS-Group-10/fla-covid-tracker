import 'dart:async';

import 'package:covid_mobile/views/county_screen.dart';
import 'package:covid_mobile/views/login_screen.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter/material.dart';
import 'package:covid_mobile/views/home_screen.dart';
import 'package:covid_mobile/views/search_screen.dart';
import 'package:covid_mobile/views/map_screen.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart'; 

Future<void> main() async {
  setupServiceLocator();
  runApp(MyApp());
}

// Add login here => once logged in route to home screen

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'COVID-19 Tracker',
      theme: ThemeData(
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: LogInScreen(),
      // home: FutureBuilder<SharedPreferences> (
      //   future: SharedPreferences.getInstance(),
      //   builder: (context, snapshot) {
      //     if(snapshot.hasData){
      //       String prefsKey = 'email';
      //       var email = snapshot.data.getString(prefsKey);
      //       print("$email");
      //       return (email == null) ? LogInScreen() : HomeScreen();
      //     }else{
      //       return LogInScreen();
      //     }
      //   }
      // ),

      routes: <String, WidgetBuilder> {
        '/login': (BuildContext context) => LogInScreen(),
        '/home': (BuildContext context) => HomeScreen(),
        '/map': (BuildContext context) => MapScreen(),
        '/list': (BuildContext context) => SearchScreen(),
        '/county_screen': (BuildContext context) => CountyScreen()
      }
    );
  }
}
