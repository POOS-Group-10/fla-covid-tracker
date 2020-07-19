/*
  This class is responsible for choosing favorite counties. It is the viewmodel
  and works by taking data and presenting it to the UI. 
*/
import 'package:covid_mobile/business_logic/models/county.dart';
import 'package:covid_mobile/services/counties/county_service.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:flutter/material.dart';

class FavoritesViewModel extends ChangeNotifier{

  final CountyService _countyService = serviceLocator<CountyService>();
  List<FavoritesPresentation> favorites = [];

  void loadData() async{
    final counties = await _countyService.getFavoriteCounties();
    _preparePresentationChoice(counties);
    notifyListeners();
  }

  void _preparePresentationChoice(List<County> data) {
    List<FavoritesPresentation> list = [];

    for(County county in data){
      print(county.countyName);
      list.add(FavoritesPresentation(
        countyName: county.countyName,
        stateName: county.stateName,
        confirmed: county.confirmed,
        newCases: county.newCases,
        death: county.death,
        newDeath: county.newDeath,
        fatalityRate: county.fatalityRate,
        latitude: county.latitude,
        longitude: county.longitude,
      ));

    }

    favorites = list; 
  }
}

class FavoritesPresentation {
  final String countyName; 
  final String stateName; 
  final int confirmed; 
  final int newCases; 
  final int death; 
  final int newDeath; 
  final String fatalityRate; 
  final double latitude; 
  final double longitude; 

  FavoritesPresentation({this.countyName, this.stateName, this.confirmed, this.newCases, this.death, this.newDeath, this.fatalityRate, this.latitude, this.longitude}); 
}

