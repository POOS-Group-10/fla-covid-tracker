import 'package:covid_mobile/business_logic/models/county.dart';
import 'package:covid_mobile/services/api/fake_data.dart';
import 'package:covid_mobile/services/api/web_api.dart';
import 'package:covid_mobile/services/counties/county_service.dart';
import 'package:covid_mobile/services/service_locator.dart';
import 'package:covid_mobile/services/storage/storage_service.dart';

class CountyServiceImplementation implements CountyService {

  StorageService _storageService = serviceLocator<StorageService>();
  WebAPI _webAPI = serviceLocator<WebAPI>();

  Future<List<County>> getAllCountyData({String base}) async {
    List<County> webData = await _webAPI.fetchCountyData();
  
    return webData;
  }
  
  @override
  Future<List<County>> getFavoriteCounties() async { 
    final favorites = await _storageService.getFavoriteCounties();

    if (favorites.length == 0 || favorites == null) {
      return [];
    }

    // for(County data in favorites){
    //   print("county in favs: ${data.countyName}");
    // }

    return favorites;
  }

  @override
  Future<void> saveFavoriteCounties(List<County> data) async {      
    await _storageService.saveFavoriteCounties(data);
  }

}