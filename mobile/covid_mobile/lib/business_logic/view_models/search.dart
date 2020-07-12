/*
  This class is responsible for choosing favorite counties. It is the viewmodel
  and works by taking data and presenting it to the UI. 
*/
import 'package:covid_mobile/business_logic/models/county.dart';
import 'package:covid_mobile/services/counties/county_service.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:flutter/material.dart';

class SearchViewModel extends ChangeNotifier{

  // Service will handle getting and saving county data. Implementation is abstracted away
  // from the view model 
  final CountyService _countyService = serviceLocator<CountyService>();

  List<FavoritesPresentation> _choices = [];
  List<County> _choicesFav = []; 
  List<County> _favorites = [];

  // Allows for access of the choices list above (will use this for the listview)
  List<FavoritesPresentation> get choices => _choices; 
  // List<FavoritesPresentation> get searches => _searchedList; 


  void loadData() async {
    final counties = await _countyService.getAllCountyData();
    _favorites = await _countyService.getFavoriteCounties(); 

    for(County county in _favorites){
      print("load data init from counties: ${county.countyName}");
    }

    _preparePresentationChoice(counties);
    notifyListeners(); 
  }

  void _preparePresentationChoice(List<County> data) {
    List<FavoritesPresentation> list = [];
    List<County> list2 = [];

    for(County county in data){
      String temp = county.countyName;
      bool isFavorite = _getFavoritesStatus(temp);

      list.add(FavoritesPresentation(
        name: temp, 
        infected: county.infected,
        isFavorite: isFavorite
      ));

      list2.add(County(countyName: county.countyName, infected: county.infected));

    }

    _choices = list; 
    _choicesFav = list2; 
  }

  bool _getFavoritesStatus(String countyCode) {
    for (County county in _favorites){
      if(countyCode == county.countyName){
        return true; 
      }
    }
    return false; 
  }

  void toggleFavoriteStatus(int index) {

    final isFavorite = !_choices[index].isFavorite;
    final countyName = _choices[index].name; 
    print("da county name: ${countyName} with index: $index");
    final county = _choicesFav[index];
  
    _choices[index].isFavorite = isFavorite; 
  

    if(isFavorite){
      _addToFavorites(county);
      print("${countyName} added to favorites");
    }else{
      _removeFromFavorites(county);
      print("${countyName} removed from favorites");
    }

    notifyListeners(); 
  }

  void _addToFavorites(County code) {
    _favorites.add(code);
    _countyService.saveFavoriteCounties(_favorites);
  }
  
  void _removeFromFavorites(County code) {
    for (final county in _favorites){
      if(county.countyName == code.countyName){
        _favorites.remove(county);
        break;
      }
    }

    _countyService.saveFavoriteCounties(_favorites);
  }
}

class FavoritesPresentation {
  final String name; 
  final int infected; 
  bool isFavorite; 

  FavoritesPresentation({this.name, this.infected, this.isFavorite});

}