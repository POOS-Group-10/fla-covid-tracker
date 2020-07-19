import 'package:covid_mobile/business_logic/models/county.dart';

abstract class WebAPI{
  Future<List<County>> fetchCountyData();
  List<County> getCountyData(); 
}