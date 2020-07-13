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
      String temp = county.countyName;

      list.add(FavoritesPresentation(
        name: temp, 
        infected: county.infected,
      ));

    }

    favorites = list; 
  }
}

class FavoritesPresentation {
  final String name; 
  final int infected; 

  FavoritesPresentation({this.name, this.infected});

}

