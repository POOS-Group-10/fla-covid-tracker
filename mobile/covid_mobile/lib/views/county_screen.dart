import 'dart:collection';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:covid_mobile/views/map_screen.dart';

class CountyScreen extends StatefulWidget {
  @override
  _CountyScreen createState() => _CountyScreen();
}

class _CountyScreen extends State<CountyScreen> {
  int index;
  //MapScreen1 test123;
  Color tempColor;
  List<LatLng> latLng1 = List<LatLng>();

  /*Future<String> loadAsset() async {
    return await rootBundle.loadString('assets/countyLines1.json');
  }*/

  @override
  Widget build(BuildContext context) {
    final Map arguments = ModalRoute.of(context).settings.arguments as Map;

    tempColor = arguments['color'];
    latLng1 = arguments['points'];
    index = arguments['index'];

    //print(latLng1);
    //print(index);

    return Scaffold(
        appBar: AppBar(
          title: Text(
              arguments['countyName'] + " County, " + arguments['stateName']),
          flexibleSpace: Container(
            decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: <Color>[
                  Color.fromRGBO(127, 127, 213, 1),
                  Color.fromRGBO(134, 168, 231, 1)
                ])),
          ),
        ),
        body: SingleChildScrollView(child: Column(
          children: [headingContainer(arguments), statsContainer(arguments)],
        )));
  }

  Widget headingContainer(Map arguments) {
    GoogleMapController mapController;

    //print(arguments['newCases']);

    final LatLng _location =
        new LatLng(arguments['latitude'], arguments['longitude']);

    Set<Polygon> border = new HashSet<Polygon>();


    void _setBorder() {
    //  Map<String, dynamic> countiiies = json.decode(await loadAsset());

      //var coooont = new Counties.fromJson(countiiies);
      /*String border1;
      List<String> pairs;
      List<String> aupair;
      print(index);
      print(" fspdijfnpidjf");

        // Here you can write your code
        border1 = coooont.countyLines[index].toString();
        border1 = border1.substring(2,border1.length-2);
        pairs = border1.split("], [");
        for (int j = 0; j < pairs.length; j++) {
          aupair = pairs[j].split(", ");
          latLng1.add(
              LatLng(double.parse(aupair[1]),
                  double.parse(aupair[0])));
        }

        MapScreen1 test = new MapScreen1();
        test.initState();*/


        //print("OWIGBad0figb)ISDHBGSOUFgb@@@@@@@@@@@");
    }

    void _onMapCreated(GoogleMapController controller) async{
      mapController = controller;
     _setBorder();
    }

    int _a = 1;

    border.add((Polygon(
      polygonId: PolygonId('polygon_id_$_a'),
      points: latLng1,
      strokeWidth: 1,
      strokeColor: Colors.black,
      fillColor: tempColor,
    )));

    return Container(

      // padding: EdgeInsets.fromLTRB(15.0, 24.0, 10.0, 0),
      child: SafeArea(
        child: Container(
            height: MediaQuery.of(context).size.height / 2.3,
            width: MediaQuery.of(context).size.width,
            child: GoogleMap(
                mapType: MapType.normal,
                onMapCreated: _onMapCreated,
                initialCameraPosition:
                    CameraPosition(target: _location, zoom: 8.4),
               zoomControlsEnabled: false,
              mapToolbarEnabled: false,
              minMaxZoomPreference: MinMaxZoomPreference(8.4,8.4),
              rotateGesturesEnabled: false,
              scrollGesturesEnabled: false,
              zoomGesturesEnabled: false,
              tiltGesturesEnabled: false,
              myLocationButtonEnabled: false,
              polygons: border,

            ),

        ),
      ),
    );
  }

  Widget statsContainer(Map arguments) {
    return SafeArea(
        child: Column(
      children: [
        _rowHeader(),
        _individualBoxRow("Confirmed", arguments['confirmed'].toString(), "New Cases", arguments['newCases'].toString()),
        _individualBoxRow("Deaths", arguments['death'].toString(), "New Deaths", arguments['newDeath'].toString()),
        _oneBoxRow("Fatality Rate", arguments['fatalityRate'].toString()),
      ],
    ));
  }

  Widget _rowHeader() {
    return Container(
        decoration: BoxDecoration(
            gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: <Color>[
                  Color.fromRGBO(127, 127, 213, 0.8),
                  Color.fromRGBO(134, 168, 231, 0.8)
                ]),
            borderRadius: BorderRadius.all(Radius.circular(5)),
            boxShadow: [
              BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 5,
                  blurRadius: 10,
                  offset: Offset(0, 3))
            ]),
        padding: EdgeInsets.fromLTRB(13, 7, 13, 7),
        margin: EdgeInsets.fromLTRB(0, 0, 0, 20),
        child: Text("COUNTY OVERVIEW",
            style: TextStyle(
                color: Colors.black,
                fontSize: 17,
                fontWeight: FontWeight.w500)));
  }

  Widget _individualBoxRow(String header, String value, String header2, String value2) {
    return Container(
      margin: EdgeInsets.fromLTRB(10, 0, 10, 20),
      child: Row(children: [
      _boxRow(header, value),
      _boxRow(header2, value2),
    ]));
  }

    Widget _oneBoxRow(String header, String value) {
    return Container(
      margin: EdgeInsets.fromLTRB(10, 0, 10, 20),
      child: Row(children: [
      _row(header, value),
    ]));
  }

   Widget _row(String header, String value) {
    return Expanded(
        child: Container(
          padding: EdgeInsets.fromLTRB(0, 15, 0, 0),
          margin: EdgeInsets.fromLTRB(100, 0, 100, 0),
        height: 70,
        decoration: BoxDecoration(
            gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: <Color>[
                  Color.fromRGBO(127, 127, 213, 0.8),
                  Color.fromRGBO(134, 168, 231, 0.8)
                ]),
            borderRadius: BorderRadius.all(Radius.circular(5)),
            boxShadow: [
              BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 2,
                  blurRadius: 10,
                  offset: Offset(0, 3))
            ]),
            child: Column(children: [
              Text(header.toUpperCase(),
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500)), 
              Text(value.toUpperCase(),
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500)), 
            ])
      ));
  }

  Widget _boxRow(String header, String value) {
    return Expanded(
        child: Container(
          padding: EdgeInsets.fromLTRB(0, 15, 0, 0),
          margin: EdgeInsets.fromLTRB(5, 0, 5, 0),
        height: 70,
        decoration: BoxDecoration(
            gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: <Color>[
                  Color.fromRGBO(127, 127, 213, 0.8),
                  Color.fromRGBO(134, 168, 231, 0.8)
                ]),
            borderRadius: BorderRadius.all(Radius.circular(5)),
            boxShadow: [
              BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 2,
                  blurRadius: 10,
                  offset: Offset(0, 3))
            ]),
            child: Column(children: [
              Text(header.toUpperCase(),
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500)), 
              Text(value.toUpperCase(),
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500)), 
            ])
      ));
  }
}
