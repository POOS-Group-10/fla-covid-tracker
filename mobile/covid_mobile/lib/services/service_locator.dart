import 'package:covid_mobile/business_logic/view_models/favorites.dart';
import 'package:covid_mobile/business_logic/view_models/search.dart';
import 'package:covid_mobile/services/api/fake_data.dart';
import 'package:covid_mobile/services/api/web_api.dart';
import 'package:covid_mobile/services/counties/county_service.dart';
import 'package:covid_mobile/services/counties/county_service_implementation.dart';
import 'package:covid_mobile/services/storage/storage_service.dart';
import 'package:covid_mobile/services/storage/storage_service_implementation.dart';
import 'package:get_it/get_it.dart';

GetIt serviceLocator = GetIt.instance; 

void setupServiceLocator(){
  serviceLocator.registerLazySingleton<StorageService>(() => StorageSerivceImplementation());

  // Every time we request a lazy singleton means the service won't be instantiated until you need it for the first time. 
  serviceLocator.registerLazySingleton<WebAPI>(() => FakeWebData());
  serviceLocator.registerLazySingleton<CountyService>(() => CountyServiceImplementation());

  // Use registerFactory to register the viewmodel. Every time we request a view model from the service locator
  // we will get a new instance of the model. 
  serviceLocator.registerFactory<SearchViewModel>(() => SearchViewModel());
  serviceLocator.registerFactory<FavoritesViewModel>(() => FavoritesViewModel());
}