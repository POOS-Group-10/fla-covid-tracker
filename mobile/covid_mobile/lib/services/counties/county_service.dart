import 'package:covid_mobile/business_logic/models/county.dart';

abstract class CountyService{

  Future<List<County>> getAllCountyData();

  Future<List<County>> getFavoriteCounties();

  Future<void> saveFavoriteCounties(List<County> data);
}