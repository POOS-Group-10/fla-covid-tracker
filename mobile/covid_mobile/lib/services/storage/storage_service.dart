import 'package:covid_mobile/business_logic/models/county.dart';

abstract class StorageService {
  Future<List<County>> getFavoriteCounties();

  Future saveFavoriteCounties(List<County> data);
}