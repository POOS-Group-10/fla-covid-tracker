import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class CountyScreen extends StatefulWidget {
  @override
  _CountyScreen createState() => _CountyScreen();
}

class _CountyScreen extends State<CountyScreen> {
  @override
  Widget build(BuildContext context) {
    final Map arguments = ModalRoute.of(context).settings.arguments as Map;
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

    print(arguments['newCases']);

    final LatLng _location =
        new LatLng(arguments['latitude'], arguments['longitude']);

    void _onMapCreated(GoogleMapController controller) {
      mapController = controller;
    }

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
                    CameraPosition(target: _location, zoom: 7.0))),
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
