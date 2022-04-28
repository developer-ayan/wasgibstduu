import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CheckBox from 'react-native-check-box';
import colors from '../../common/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import RNLocation from 'react-native-location';
import {AuthContext} from '../../context/AuthContext';
import color from '../../common/colors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const UserFilter = () => {
  const [location, setLocation] = useState();

  const lang = {icon: 'weekend', name: `Furnished`, selected: false};

  const [unitAmenities, setUnitAmenities] = useState([
    {
      id: 1,
      icon: 'house',
      name: 'New Construction',
      arname: 'مبنى جديد',
      selected: false,
    },
    {
      id: 2,
      icon: 'weekend',
      name: `Furnished`,
      arname: 'مؤثث',
      selected: false,
    },
    {
      id: 3,
      icon: 'local-fire-department',
      name: 'Firepits',
      arname: 'مدفأة',
      selected: false,
    },
    {
      id: 4,
      icon: 'store',
      name: 'Storage Space',
      arname: 'غرفة مخزن',
      selected: false,
    },
    {
      id: 5,
      icon: 'opacity',
      name: 'Water Access',
      arname: 'مياه تحلية',
      selected: false,
    },
    {
      id: 6,
      icon: 'nature-people',
      name: 'Doorman',
      arname: 'حارس مبنى',
      selected: false,
    },
    {
      id: 7,
      icon: 'person',
      name: 'Maid Room',
      arname: 'غرفة خدم',
      selected: false,
    },
    {
      id: 8,
      icon: 'local-laundry-service',
      name: 'Laundry',
      arname: 'غرفة الغسيل',
      selected: false,
    },
    {
      id: 9,
      icon: 'wifi',
      name: 'High Speed Internet',
      arname: 'خدمة الإنترنت',
      selected: false,
    },
    {
      id: 10,
      icon: 'padding',
      name: 'Dishwasher',
      arname: 'غسالة صحون',
      selected: false,
    },
    {
      id: 11,
      icon: 'accessible',
      name: 'Chair Accessibility',
      arname: 'ممر لذوي الاحتياجات',
      selected: false,
    },
    {
      id: 12,
      icon: 'car-repair',
      name: 'Car Garage',
      arname: 'كراج سيارة',
      selected: false,
    },
    {
      id: 13,
      icon: 'single-bed',
      name: 'Semi Furnished',
      arname: 'شبه مؤثث',
      selected: false,
    },
    {
      id: 14,
      icon: 'format-color-fill',
      name: 'Renovated',
      arname: 'تم تجديده',
      selected: false,
    },
    {
      id: 15,
      icon: 'roofing',
      name: 'Smart Home',
      arname: 'منزل ذكي',
      selected: false,
    },
    {
      id: 16,
      icon: 'directions-car',
      name: 'Private Parking',
      arname: 'موقف سيارة',
      selected: false,
    },
    {
      id: 17,
      icon: 'local-florist',
      name: 'Garden',
      arname: 'حديقة منزل',
      selected: false,
    },
    {
      id: 18,
      icon: 'elevator',
      name: 'Elevator',
      arname: 'مصعد',
      selected: false,
    },
  ]);
  const [communityAmenities, setCommunityAmenities] = useState([
    {
      id: 1,
      icon: 'pool',
      name: 'Swimming Pool',
      arname: 'مسبح',
    },
    {
      id: 2,
      icon: 'local-florist',
      name: 'Garden',
      arname: 'حديقة عامه',
    },
    {
      id: 3,
      icon: 'support',
      name: 'Playing Area',
      arname: 'منتزه',
    },
    {
      id: 4,
      icon: 'fitness-center',
      name: 'Gym',
      arname: 'نادي رياضي',
    },
    {
      id: 5,
      icon: 'directions-car',
      name: 'Parking',
      arname: 'مواقف للسيارات',
    },
    {
      id: 6,
      icon: 'restaurant-menu',
      name: 'Restaurant',
      arname: 'مطاعم',
    },
    {
      id: 7,

      icon: 'spa',
      name: 'Spa',
      arname: 'منتجع صحي',
    },
    {
      id: 8,
      icon: 'school',
      name: 'School',
      arname: 'مدرسة',
    },
    {
      id: 9,
      icon: 'local-hospital',
      name: 'Hospital',
      arname: 'مستشفى',
    },
    {
      id: 10,
      icon: 'beach-access',
      name: 'Beach',
      arname: 'شاطئ',
    },
    {
      id: 11,
      icon: 'local-cafe',
      name: 'Coffee Shop',
      arname: 'مقهى كوفي',
    },
    {
      id: 12,
      icon: 'local-mall',
      name: 'Mall',
      arname: 'مول',
    },
    {
      id: 13,
      icon: 'shopping-cart',
      name: 'Supermarket',
      arname: 'تموينات غذائية',
    },
    {
      id: 14,
      icon: 'library-books',
      name: 'Library',
      arname: 'مكتبة عامه',
    },
    {
      id: 15,
      icon: 'wb-shade',
      name: 'Mosque',
      arname: 'مسجد',
    },
    {
      id: 16,
      icon: 'movie-creation',
      name: 'Movie Theatre',
      arname: 'سينما',
    },
    {
      id: 17,
      icon: 'broken-image',
      name: 'Landscape',
      arname: 'مطل رائع',
    },
  ]);

  const {
    // selectedBathrooms,
    // setSelectedBathrooms,
    // unit,
    // setUnit,
    // PurchaseType,
    // setPurchaseType,
    // landArea,
    // setLandArea,
    // selectedBedrooms,
    // setSelectedBedrooms,
    // price,
    // setprice,
    // selectedPropertyType,
    // setSelectedPropertyType,
    // address,
    // setAddress,
    // community,
    // setCommunity,
    language,
    dispatchDashboardAction,
    getProperties,
    getPropertiesSkip,
    isSkip,
    selectedLanguage,
  } = useContext(AuthContext);

  const [selectedBathrooms, setSelectedBathrooms] = useState([]);
  const [unit, setUnit] = useState([]);
  const [PurchaseType, setPurchaseType] = useState('sale');
  const [landArea, setLandArea] = useState([0, 100000]);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [price, setprice] = useState([0, 999999999]);
  const [selectedPropertyType, setSelectedPropertyType] = useState(0);
  const [address, setAddress] = useState('');
  const [community, setCommunity] = useState([]);
  const [moreBedrooms, setMoreBedrooms] = useState(false);
  const [moreBathrooms, setMoreBathrooms] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  const SelectType = selected => {
    setPurchaseType(selected);
  };

  const addCommunityAmenity = name => {
    if (community.includes(name)) {
      setCommunity(prev => prev.filter(item => item !== name));
      // console.log(setCommunity(prev => prev.filter(item => item !== name)));
    } else {
      setCommunity(prev => prev.concat(name));
    }
  };
  const addUnitAmenity = name => {
    if (unit.includes(name)) {
      setUnit(prev => prev.filter(item => item !== name));
    } else {
      setUnit(prev => prev.concat(name));
    }
  };

  const getLocation = () => {
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
        rationale: {
          title: 'Location permission',
          message:
            'Need Location Permission for searching nearest Properties to you',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    })
      .then(granted => {
        RNLocation.configure({
          distanceFilter: 5.0,
        });
        if (granted) {
          RNLocation.getLatestLocation({timeout: 60000})
            .then(latestLocation => {
              setLocation({
                longitude: latestLocation.longitude,
                latitude: latestLocation.latitude,
              });
              return latestLocation;
            })
            .then(location =>
              fetch(
                `https://us1.locationiq.com/v1/reverse.php?key=pk.bd733b0aaf436f3ad0ef530a41ab5ee3&lat=${location.latitude}&lon=${location.longitude}&format=json`,
              ),
            )
            .then(res => res.json())
            .then(resData => setAddress(resData.display_name))
            .catch(e => console.log('Hello world => ', e));
        }
      })

      .catch(e => console.log(e));
  };

  const getRangeData = useCallback(async () => {
    setLoading(true);
    try {
      let base_url = 'https://xionex.in/msaken/admin/public/api/get-range-data';

      // eslint-disable-next-line no-undef
      const response = await fetch(base_url, {
        method: 'get',
      });

      const responseData = await response.json();

      if (responseData.status === true) {
        // setprice([
        //   parseFloat(responseData.data.pricemin),
        //   parseFloat(responseData.data.pricemax),
        // ]);
        // setLandArea([
        //   parseFloat(responseData.data.landmin),
        //   parseFloat(responseData.data.landmax),
        // ]);
        // setUnitAmenities(responseData.data.In_unit);
        // setCommunityAmenities(responseData.data.community);
        // console.log(responseData.data.landmax, responseData.data.pricemax);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const SelectedProperty = name => {
    // console.log('name => ', name);
    if (selectedPropertyType == name) {
      setSelectedPropertyType(prev => prev.filter(item => item !== name));
    } else {
      // setSelectedPropertyType(prev => prev.concat(name));
      setSelectedPropertyType(name);
    }
  };

  // console.log(selectedPropertyType);

  useFocusEffect(
    useCallback(() => {
      // setprice([0, 9999]);
      // setLandArea([0, 10000]);
      // setSelectedBathrooms([1]);
      // setSelectedBedrooms([1]);
      // // getRangeData();
      // setPurchaseType('sale');
      // setSelectedPropertyType([]);
      // setUnit([]);
      // setCommunity([]);
      // setAddress('');
      // setMoreBedrooms(false);
      // setMoreBathrooms(false);
      // setSelectedBedroom([
      //   true,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      // ]);
      // setSelectedBathroom([
      //   true,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      //   false,
      // ]);
      // setUnitAmenities([
      //   {id: 1, icon: 'house', name: 'New Consturction', selected: false},
      //   {
      //     id: 2,
      //     icon: 'weekend',
      //     name: 'Furnished',
      //     selected: false,
      //   },
      //   {
      //     id: 3,
      //     icon: 'local-fire-department',
      //     name: 'Firepits',
      //     selected: false,
      //   },
      //   {
      //     id: 4,
      //     icon: 'store',
      //     name: 'Storage Space',
      //     selected: false,
      //   },
      //   {
      //     id: 5,
      //     icon: 'opacity',
      //     name: 'Water Access',
      //     selected: false,
      //   },
      //   {
      //     id: 6,
      //     icon: 'nature-people',
      //     name: 'Doorman',
      //     selected: false,
      //   },
      //   {
      //     id: 7,
      //     icon: 'person',
      //     name: 'Maid room',
      //     selected: false,
      //   },
      //   {
      //     id: 8,
      //     icon: 'local-laundry-service',
      //     name: 'Laundry',
      //     selected: false,
      //   },
      //   {
      //     id: 9,
      //     icon: 'wifi',
      //     name: 'High Speed Internet',
      //     selected: false,
      //   },
      //   {
      //     id: 10,
      //     icon: 'padding',
      //     name: 'Dishwasher',
      //     selected: false,
      //   },
      //   {
      //     id: 11,
      //     icon: 'accessible',
      //     name: 'Chair Accessibility',
      //     selected: false,
      //   },
      //   {
      //     id: 12,
      //     icon: 'car-repair',
      //     name: 'Car Garage',
      //     selected: false,
      //   },
      //   {
      //     id: 13,
      //     icon: 'accessible',
      //     name: 'Semi Furnished',
      //     selected: false,
      //   },
      //   {
      //     id: 14,
      //     icon: 'format-color-fill',
      //     name: 'Renovated',
      //     selected: false,
      //   },
      //   {
      //     id: 15,
      //     icon: 'roofing',
      //     name: 'Smart Home',
      //     selected: false,
      //   },
      //   {
      //     id: 16,
      //     icon: 'directions-car',
      //     name: 'Private Parking',
      //     selected: false,
      //   },
      //   {
      //     id: 17,
      //     icon: 'local-florist',
      //     name: 'Garden',
      //     selected: false,
      //   },
      //   {
      //     id: 18,
      //     icon: 'elevator',
      //     name: 'Elevator',
      //     selected: false,
      //   },
      // ]);
      // setCommunityAmenities([
      //   {
      //     id: 1,
      //     icon: 'pool',
      //     name: 'Swimming Pool',
      //   },
      //   {
      //     id: 2,
      //     icon: 'local-florist',
      //     name: 'Garden',
      //   },
      //   {
      //     id: 3,
      //     icon: 'support',
      //     name: 'Playing Area',
      //   },
      //   {
      //     id: 4,
      //     icon: 'fitness-center',
      //     name: 'Gym',
      //   },
      //   {
      //     id: 5,
      //     icon: 'directions-car',
      //     name: 'Parking',
      //   },
      //   {
      //     id: 6,
      //     icon: 'restaurant-menu',
      //     name: 'Restaurant',
      //   },
      //   {
      //     id: 7,
      //     icon: 'spa',
      //     name: 'Spa',
      //   },
      //   {
      //     id: 8,
      //     icon: 'school',
      //     name: 'School',
      //   },
      //   {
      //     id: 9,
      //     icon: 'local-hospital',
      //     name: 'Hospital',
      //   },
      //   {
      //     id: 10,
      //     icon: 'beach-access',
      //     name: 'Beach',
      //   },
      //   {
      //     id: 11,
      //     icon: 'local-cafe',
      //     name: 'Coffee Shop',
      //   },
      //   {
      //     id: 12,
      //     icon: 'local-mall',
      //     name: 'Mall',
      //   },
      //   {
      //     id: 13,
      //     icon: 'shopping-cart',
      //     name: 'Supermarket',
      //   },
      //   {
      //     id: 14,
      //     icon: 'library-books',
      //     name: 'Library',
      //   },
      //   {
      //     id: 15,
      //     icon: 'wb-shade',
      //     name: 'Mosque',
      //   },
      //   {
      //     id: 16,
      //     icon: 'movie-creation',
      //     name: 'Movie Theatre',
      //   },
      //   {
      //     id: 17,
      //     icon: 'broken-image',
      //     name: 'Landscape',
      //   },
      // ]);
    }, []),
  );

  const filterHandler = () => {
    // console.log(community, unit);
    dispatchDashboardAction({
      type: 'FILTER',
      state: {
        selectedBathrooms: selectedBathrooms,
        unit: unit,
        PurchaseType: PurchaseType,
        landArea: landArea,
        selectedBedrooms: selectedBedrooms,
        price: price,
        selectedPropertyType: selectedPropertyType,
        address: address,
        community: community,
      },
    });
    // getProperties();
    // isSkip ? getPropertiesSkip() : getProperties();
    navigation.navigate(isSkip ? 'skipDashBoard' : 'userDashBoard', location);
    // navigation.navigate('skipDashBoard', location);
  };

  const bedroomHandler = bedroom => {
    if (selectedBedrooms.includes(bedroom)) {
      setSelectedBedrooms(prev => prev.filter(item => item !== bedroom));
    } else {
      setSelectedBedrooms(prev => prev.concat(bedroom));
    }
  };

  const bathroomHandler = bathroom => {
    if (selectedBathrooms.includes(bathroom)) {
      setSelectedBathrooms(prev => prev.filter(item => item !== bathroom));
    } else {
      setSelectedBathrooms(prev => prev.concat(bathroom));
    }
  };
  const FetchCoordinates = async description => {
    try {
      let base_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${description}&key=AIzaSyD6H1cGAMzHOID3_rSUMB7Uxx1CE0SlP0c`;

      // eslint-disable-next-line no-undef
      const response = await fetch(base_url, {
        method: 'get',
      });

      const responseData = await response.json();

      if (responseData.status != 'OK') {
        throw new Error(responseData.error_message);
      }

      const result = responseData.results;
      // console.log('RESPONSE DATA => ', result);
      // console.log(result[0]);
      // console.log(result[0].geometry.location);
      setLocation({
        longitude: result[0].geometry.location.lng,
        latitude: result[0].geometry.location.lat,
      });
    } catch (error) {
      Alert.alert(error.message);
      console.log(error.message);
    }
  };
  return isLoading ? (
    <View style={styles.activity}>
      <ActivityIndicator size="large" color={colors.themeRed} />
    </View>
  ) : (
    <View style={styles.screen}>
      <View style={{marginBottom: 60}}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={[styles.component_view]}>
            <Text
              style={[
                styles.Label,
                selectedLanguage === 'arabic' && {textAlign: 'right'},
              ]}>
              {language.addressOrCity}
            </Text>

            <View style={[styles.Address_components]}>
              <ScrollView
                keyboardShouldPersistTaps={'always'}
                contentContainerStyle={{
                  width: '100%',
                  flexDirection: 'row-reverse',
                  // alignSelf: 'center',
                  // alignItems: 'center',
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  marginBottom: Platform.OS === 'ios' ? -10 : 0,
                }}>
                <GooglePlacesAutocomplete
                  nestedScrollEnabled={true}
                  autoFocus={false}
                  textInputProps={{
                    placeholderTextColor: colors.grey,
                    color: colors.grey,
                    returnKeyType: 'next',
                    fontSize: 14,
                    multiline: true,
                    // textAlign: Platform.OS === 'ios' ? 'right' : 'left',
                    // textAlignVertical: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    fontFamily: 'Roboto-Regular',
                    value: address,
                    onChangeText: setAddress,
                  }}
                  styles={{
                    listView: {maxHeight: 150, width: '100%'},
                  }}
                  listViewDisplayed={false}
                  placeholder={language.searchByAnAddressOrCityLocation}
                  placeholderTextColor={colorys.lightGre}
                  onPress={data => {
                    setAddress(data.description);
                    FetchCoordinates(data.description);
                  }}
                  query={{
                    key: 'AIzaSyD6H1cGAMzHOID3_rSUMB7Uxx1CE0SlP0c',
                    language: 'en',
                  }}
                />
              </ScrollView>
              <View
                style={[
                  styles.iconView,
                  selectedLanguage === 'arabic' && {
                    flexDirection: 'row-reverse',
                  },
                ]}>
                <TouchableOpacity onPress={() => getLocation()}>
                  <Icon
                    style={styles.locationIcon}
                    name="my-location"
                    size={20}
                    color="#696969"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeIcon}
                  activeOpacity={0.6}
                  onPress={() => setAddress('')}>
                  <Icon name="close" size={15} color={colors.grey} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.container_type}>
              {PurchaseType == 'sale' && (
                <>
                  <TouchableOpacity style={styles.component_type_active}>
                    <Text style={styles.text_type_active}>
                      {language.toBuy}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => SelectType('rent')}
                    style={styles.component_type}>
                    <Text style={styles.text_type}>{language.toRent}</Text>
                  </TouchableOpacity>
                </>
              )}

              {PurchaseType == 'rent' && (
                <>
                  <TouchableOpacity
                    onPress={() => SelectType('sale')}
                    style={styles.component_type}>
                    <Text style={styles.text_type}>{language.toBuy}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.component_type_active}>
                    <Text style={styles.text_type_active}>
                      {language.toRent}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <Text
              style={[
                styles.Label,
                selectedLanguage === 'arabic' && {
                  textAlign: 'right',
                },
              ]}>
              {language.propertyType}
            </Text>

            <View
              style={{
                flexDirection:
                  selectedLanguage === 'arabic' ? 'row-reverse' : 'row',
                flexWrap: 'wrap',
                marginHorizontal: 10,
              }}
              horizontal={true}>
              <TouchableOpacity
                onPress={() => setSelectedPropertyType([])}
                style={[
                  selectedPropertyType != 0
                    ? styles.Property_type_Buttons
                    : styles.Property_type_Buttons_Active,
                  {width: '20%'},
                ]}>
                <Text
                  style={
                    selectedPropertyType != 0
                      ? styles.Property_type_text
                      : styles.Property_type_text_Active
                  }>
                  {language.all}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={SelectedProperty.bind(this, 'home')}
                style={[
                  {
                    flexDirection:
                      selectedLanguage === 'arabic' ? 'row-reverse' : 'row',
                  },
                  selectedPropertyType == 'home'
                    ? styles.Property_type_Buttons_Active
                    : styles.Property_type_Buttons,
                ]}>
                <Image
                  source={
                    selectedPropertyType == 'home'
                      ? require('../../assets/home.png')
                      : require('../../assets/home-gray.png')
                  }
                  style={styles.propertyImage}
                />
                <Text
                  style={
                    selectedPropertyType == 'home'
                      ? styles.Property_type_text_Active
                      : styles.Property_type_text
                  }>
                  {language.homes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={SelectedProperty.bind(this, 'Land')}
                style={[
                  {
                    flexDirection:
                      selectedLanguage === 'arabic' ? 'row-reverse' : 'row',
                  },
                  selectedPropertyType == 'Land'
                    ? styles.Property_type_Buttons_Active
                    : styles.Property_type_Buttons,
                ]}>
                <Image
                  source={
                    selectedPropertyType == 'Land'
                      ? require('../../assets/land.png')
                      : require('../../assets/land_gray.png')
                  }
                  style={styles.propertyImage}
                />
                <Text
                  style={[
                    {
                      flexDirection:
                        selectedLanguage === 'arabic' ? 'row-reverse' : 'row',
                    },
                    selectedPropertyType == 'Land'
                      ? styles.Property_type_text_Active
                      : styles.Property_type_text,
                  ]}>
                  {language.land}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={SelectedProperty.bind(this, 'Apartments')}
                style={[
                  {
                    flexDirection:
                      selectedLanguage === 'arabic' ? 'row-reverse' : 'row',
                  },
                  selectedPropertyType == 'Apartments'
                    ? styles.Property_type_Buttons_Active
                    : styles.Property_type_Buttons,
                ]}>
                <Image
                  source={
                    selectedPropertyType == 'Apartments'
                      ? require('../../assets/apartments.png')
                      : require('../../assets/apartments_gray.png')
                  }
                  style={styles.propertyImage}
                />
                <Text
                  style={
                    selectedPropertyType == 'Apartments'
                      ? styles.Property_type_text_Active
                      : styles.Property_type_text
                  }>
                  {language.apartments}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={SelectedProperty.bind(this, 'Offices')}
                style={[
                  {
                    flexDirection:
                      selectedLanguage === 'arabic' ? 'row-reverse' : 'row',
                  },
                  selectedPropertyType == 'Offices'
                    ? styles.Property_type_Buttons_Active
                    : styles.Property_type_Buttons,
                ]}>
                <Image
                  source={
                    selectedPropertyType == 'Offices'
                      ? require('../../assets/office.png')
                      : require('../../assets/office_gray.png')
                  }
                  style={styles.propertyImage}
                />
                <Text
                  style={
                    selectedPropertyType == 'Offices'
                      ? styles.Property_type_text_Active
                      : styles.Property_type_text
                  }>
                  {language.offices}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={SelectedProperty.bind(this, 'Retail')}
                style={[
                  {
                    flexDirection:
                      selectedLanguage === 'arabic' ? 'row-reverse' : 'row',
                  },
                  selectedPropertyType == 'Retail'
                    ? styles.Property_type_Buttons_Active
                    : styles.Property_type_Buttons,
                ]}>
                <Image
                  source={
                    selectedPropertyType == 'Retail'
                      ? require('../../assets/retail.png')
                      : require('../../assets/retail_gray.png')
                  }
                  style={styles.propertyImage}
                />
                <Text
                  style={
                    selectedPropertyType == 'Retail'
                      ? styles.Property_type_text_Active
                      : styles.Property_type_text
                  }>
                  {language.retail}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={SelectedProperty.bind(this, 'Industry')}
                style={[
                  {
                    flexDirection:
                      selectedLanguage === 'arabic' ? 'row-reverse' : 'row',
                  },
                  selectedPropertyType == 'Industry'
                    ? styles.Property_type_Buttons_Active
                    : styles.Property_type_Buttons,
                ]}>
                <Image
                  source={
                    selectedPropertyType == 'Industry'
                      ? require('../../assets/industry.png')
                      : require('../../assets/industry_gray.png')
                  }
                  style={styles.propertyImage}
                />
                <Text
                  style={
                    selectedPropertyType == 'Industry'
                      ? styles.Property_type_text_Active
                      : styles.Property_type_text
                  }>
                  {language.industry}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={SelectedProperty.bind(this, 'Warehouse')}
                style={[
                  {
                    flexDirection:
                      selectedLanguage === 'arabic' ? 'row-reverse' : 'row',
                  },
                  selectedPropertyType == 'Warehouse'
                    ? styles.Property_type_Buttons_Active
                    : styles.Property_type_Buttons,
                ]}>
                <Image
                  source={
                    selectedPropertyType == 'Warehouse'
                      ? require('../../assets/warehouse.png')
                      : require('../../assets/warehouse_gray.png')
                  }
                  style={styles.propertyImage}
                />
                <Text
                  style={
                    selectedPropertyType == 'Warehouse'
                      ? styles.Property_type_text_Active
                      : styles.Property_type_text
                  }>
                  {language.warehouse}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.component_Filter, {height: 90}]}>
              <Text
                style={[
                  styles.Label,
                  selectedLanguage === 'arabic' && {textAlign: 'right'},
                ]}>
                {language.price}
              </Text>
              <View
                style={[
                  styles.Slider,
                  selectedLanguage === 'arabic' && {alignSelf: 'flex-end'},
                ]}>
                <Text
                  style={[
                    styles.pricetext,
                    selectedLanguage === 'arabic' && {textAlign: 'right'},
                  ]}>
                  {selectedLanguage === 'english'
                    ? `${price[0]} SAR - ${price[1]} SAR `
                    : `${price[1]} SAR - ${price[0]} SAR `}
                </Text>

                <MultiSlider
                  values={[price[0], price[1]]}
                  // sliderLength={280}
                  // onValuesChangeFinish={value => setprice(value)}
                  onValuesChange={value => setprice(value)}
                  min={0}
                  max={99999}
                  // step={10}
                  markerStyle={{
                    backgroundColor: '#FFFF',
                    borderWidth: 2,
                    height: 15,
                    width: 15,
                    borderColor: '#E32C46',
                  }}
                  selectedStyle={{backgroundColor: '#E32C46'}}
                />
                {/* <Slider
                  values={[1, 1000]}
                  min={1}
                  max={1000}
                  markerStyle={{
                    height: 10,
                    width: 10,
                    borderRadius: 15,
                    backgroundColor: '#FFFF',
                    borderWidth: 2,
                    borderColor: '#E32C46',
                  }}
                  selectedStyle={{backgroundColor: '#E32C46'}}
                  onValuesChange={value => setprice(value)}
                /> */}
              </View>
            </View>

            <View style={[styles.component_Filter, {height: 65}]}>
              <Text
                style={[
                  styles.Label,
                  selectedLanguage === 'arabic' && {textAlign: 'right'},
                ]}>
                {language.bedrooms}
              </Text>

              <View
                style={{
                  flexDirection:
                    selectedLanguage === 'english' ? 'row' : 'row-reverse',
                  marginTop: 10,
                }}>
                {!moreBedrooms ? (
                  <>
                    <View style={[styles.innerCheckBox]}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(1) ? true : false}
                        onClick={bedroomHandler.bind(this, 1)}
                        checkBoxColor="#E32C46"
                      />
                      <Text style={styles.bedroomText}> 1</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(2) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 2)}
                      />
                      <Text style={styles.bedroomText}> 2</Text>
                    </View>

                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(3) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 3)}
                      />
                      <Text style={styles.bedroomText}> 3</Text>
                    </View>

                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(4) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 4)}
                      />
                      <Text style={styles.bedroomText}> 4</Text>
                    </View>

                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(5) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 5)}
                      />
                      <Text style={styles.bedroomText}> 5</Text>
                    </View>

                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(6) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 6)}
                      />
                      <Text style={styles.bedroomText}> 6</Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => setMoreBedrooms(true)}
                      style={styles.rightIcon}>
                      <Icon
                        name={
                          selectedLanguage === 'english'
                            ? 'chevron-right'
                            : 'chevron-left'
                        }
                        size={25}
                        color={colors.grey}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => setMoreBedrooms(false)}
                      style={styles.rightIcon}>
                      <Icon
                        name={
                          selectedLanguage === 'english'
                            ? 'chevron-left'
                            : 'chevron-right'
                        }
                        size={25}
                        color={colors.grey}
                      />
                    </TouchableOpacity>
                    <View style={[styles.innerCheckBox, {marginLeft: 0}]}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(7) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 7)}
                      />
                      <Text style={styles.bedroomText}> 7</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(8) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 8)}
                      />
                      <Text style={styles.bedroomText}> 8</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(9) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 9)}
                      />
                      <Text style={styles.bedroomText}> 9</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(10) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 10)}
                      />
                      <Text style={styles.bedroomText}> 10</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(11) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 11)}
                      />
                      <Text style={styles.bedroomText}> 11</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBedrooms.includes(12) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bedroomHandler.bind(this, 12)}
                      />
                      <Text style={styles.bedroomText}> 12</Text>
                    </View>
                  </>
                )}
              </View>
            </View>

            <View style={[styles.component_Filter, {height: 65}]}>
              <Text
                style={[
                  styles.Label,
                  selectedLanguage === 'arabic' && {textAlign: 'right'},
                ]}>
                {language.bathrooms}
              </Text>
              <View
                style={{
                  flexDirection:
                    selectedLanguage === 'english' ? 'row' : 'row-reverse',
                  marginTop: 10,
                }}>
                {!moreBathrooms ? (
                  <>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBathrooms.includes(1) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 1)}
                      />
                      <Text style={styles.bedroomText}> 1</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBathrooms.includes(2) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 2)}
                      />
                      <Text style={styles.bedroomText}> 2</Text>
                    </View>

                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBathrooms.includes(3) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 3)}
                      />
                      <Text style={styles.bedroomText}> 3</Text>
                    </View>

                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBathrooms.includes(4) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 4)}
                      />
                      <Text style={styles.bedroomText}> 4</Text>
                    </View>

                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBathrooms.includes(5) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 5)}
                      />
                      <Text style={styles.bedroomText}> 5</Text>
                    </View>

                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBathrooms.includes(6) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 6)}
                      />
                      <Text style={styles.bedroomText}> 6</Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => setMoreBathrooms(true)}
                      style={styles.rightIcon}>
                      <Icon
                        name={
                          selectedLanguage === 'english'
                            ? 'chevron-right'
                            : 'chevron-left'
                        }
                        size={25}
                        color={colors.grey}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => setMoreBathrooms(false)}
                      style={styles.rightIcon}>
                      <Icon
                        name={
                          selectedLanguage === 'english'
                            ? 'chevron-left'
                            : 'chevron-right'
                        }
                        size={25}
                        color={colors.grey}
                      />
                    </TouchableOpacity>
                    <View style={[styles.innerCheckBox, {marginLeft: 0}]}>
                      <CheckBox
                        isChecked={selectedBathrooms.includes(7) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 7)}
                      />
                      <Text style={styles.bedroomText}> 7</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBathrooms.includes(8) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 8)}
                      />
                      <Text style={styles.bedroomText}> 8</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={selectedBathrooms.includes(9) ? true : false}
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 9)}
                      />
                      <Text style={styles.bedroomText}> 9</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={
                          selectedBathrooms.includes(10) ? true : false
                        }
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 10)}
                      />
                      <Text style={styles.bedroomText}> 10</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={
                          selectedBathrooms.includes(11) ? true : false
                        }
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 11)}
                      />
                      <Text style={styles.bedroomText}> 11</Text>
                    </View>
                    <View style={styles.innerCheckBox}>
                      <CheckBox
                        isChecked={
                          selectedBathrooms.includes(12) ? true : false
                        }
                        checkBoxColor="#E32C46"
                        onClick={bathroomHandler.bind(this, 12)}
                      />
                      <Text style={styles.bedroomText}> 12</Text>
                    </View>
                  </>
                )}
              </View>
            </View>
            <View style={[styles.component_Filter, {height: 90}]}>
              <Text
                style={[
                  styles.Label,
                  selectedLanguage === 'arabic' && {textAlign: 'right'},
                ]}>
                {language.landArea}
              </Text>
              <View
                style={[
                  styles.Slider,
                  selectedLanguage === 'arabic' && {alignSelf: 'flex-end'},
                ]}>
                <Text
                  style={[
                    styles.pricetext,
                    selectedLanguage === 'arabic' && {textAlign: 'right'},
                  ]}>
                  {selectedLanguage === 'english'
                    ? `${landArea[0]} sq.m - ${landArea[1]} sq.m `
                    : `${landArea[1]} sq.m - ${landArea[0]} sq.m `}
                </Text>

                <MultiSlider
                  values={[landArea[0], landArea[1]]}
                  // sliderLength={280}
                  onValuesChange={value => setLandArea(value)}
                  // onValuesChangeFinish={value => setLandArea(value)}
                  min={0}
                  max={10000}
                  // step={10}
                  markerStyle={{
                    backgroundColor: '#FFFF',
                    height: 15,
                    width: 15,
                    borderWidth: 2,
                    borderColor: '#E32C46',
                  }}
                  selectedStyle={{backgroundColor: '#E32C46'}}
                />
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text
                style={[
                  styles.descriptionTitle,
                  {marginTop: 15, marginBottom: 10},
                  selectedLanguage === 'arabic' && {textAlign: 'right'},
                ]}>
                {language.inUnitAmenities}
              </Text>
              {selectedLanguage === 'english' ? (
                <View style={styles.unitInnerrContainer}>
                  {unitAmenities.map((item, index) => {
                    return (
                      <View key={item.id} style={styles.unitMainViews}>
                        <TouchableOpacity
                          style={styles.unitViews}
                          activeOpacity={0.6}
                          onPress={addUnitAmenity.bind(this, item.name)}>
                          <Icon
                            name={item.icon}
                            color={
                              unit.includes(item.name)
                                ? colors.themeRed
                                : colors.grey
                            }
                            size={20}
                          />
                          <Text
                            style={[
                              styles.unitText,
                              {
                                color: unit.includes(item.name)
                                  ? colors.themeRed
                                  : colors.grey,

                                // textAlign:selectedLanguage==='arabic' && 'left':

                                // selectedLanguage==='arabic' && textAlign:'left'
                              },
                            ]}>
                            {selectedLanguage === 'english'
                              ? item.name
                              : item.arname}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View style={styles.unitInnerrContainer}>
                  {unitAmenities.map((item, index) => {
                    return (
                      <View key={item.id} style={styles.unitMainViews}>
                        <TouchableOpacity
                          style={styles.unitViews}
                          activeOpacity={0.6}
                          onPress={addUnitAmenity.bind(this, item.name)}>
                          <Text
                            style={[
                              styles.unitText,
                              {
                                color: unit.includes(item.name)
                                  ? colors.themeRed
                                  : colors.grey,

                                textAlign: 'right',

                                // selectedLanguage==='arabic' && textAlign:'left'
                              },
                            ]}>
                            {selectedLanguage === 'english'
                              ? item.name
                              : item.arname}
                          </Text>
                          <Icon
                            name={item.icon}
                            color={
                              unit.includes(item.name)
                                ? colors.themeRed
                                : colors.grey
                            }
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>

            <View style={[styles.descriptionContainer, {marginVertical: 10}]}>
              <Text
                style={[
                  styles.descriptionTitle,
                  {marginTop: 15, marginBottom: 10},
                  selectedLanguage === 'arabic' && {textAlign: 'right'},
                ]}>
                {language.communityAmenities}
              </Text>
              {selectedLanguage === 'english' ? (
                <View style={styles.unitInnerrContainer}>
                  {communityAmenities.map((item, index) => {
                    return (
                      <View key={item.id} style={styles.unitMainViews}>
                        <TouchableOpacity
                          style={styles.unitViews}
                          activeOpacity={0.6}
                          onPress={addCommunityAmenity.bind(this, item.name)}>
                          <Icon
                            name={item.icon}
                            color={
                              community.includes(item.name)
                                ? colors.themeRed
                                : colors.grey
                            }
                            size={20}
                          />
                          <Text
                            style={[
                              styles.unitText,
                              {
                                color: community.includes(item.name)
                                  ? colors.themeRed
                                  : colors.grey,
                              },
                            ]}>
                            {selectedLanguage === 'english'
                              ? item.name
                              : item.arname}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View style={styles.unitInnerrContainer}>
                  {communityAmenities.map((item, index) => {
                    return (
                      <View key={item.id} style={styles.unitMainViews}>
                        <TouchableOpacity
                          style={styles.unitViews}
                          activeOpacity={0.6}
                          onPress={addCommunityAmenity.bind(this, item.name)}>
                          <Text
                            style={[
                              styles.unitText,
                              {
                                color: community.includes(item.name)
                                  ? colors.themeRed
                                  : colors.grey,
                                textAlign: 'right',
                              },
                            ]}>
                            {item.arname}
                          </Text>
                          <Icon
                            name={item.icon}
                            color={
                              community.includes(item.name)
                                ? colors.themeRed
                                : colors.grey
                            }
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={filterHandler}
        style={styles.applyButton}>
        <Text style={styles.applyText}>{language.apply}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCheckBox: {
    marginTop: 5,
    // marginLeft: 15,
    marginHorizontal: 7.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricetext: {
    color: colors.grey,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    marginTop: 10,
  },
  containerPrices: {
    flexDirection: 'row',
    marginTop: 10,
  },

  Slider: {
    paddingHorizontal: 20,
  },
  component_Filter: {
    // height: 100,
    borderTopWidth: 0.5,
    marginTop: 20,
    borderColor: '#B3AEAD',

    // paddingTop: 5,
  },

  Property_type_Icon: {
    marginRight: 5,
  },
  Property_type_text_Active: {
    color: '#FFFF',
  },
  Property_type_text: {
    color: '#B3AEAD',
  },
  Property_type_Buttons_Active: {
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: 10,
    borderColor: '#E32C46',
    backgroundColor: '#E32C46',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    marginHorizontal: 3,
    height: 45,
    paddingHorizontal: 5,
  },
  Property_type_Buttons: {
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    borderColor: '#B3AEAD',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: '30%',
    marginHorizontal: 3,
    height: 45,
    paddingHorizontal: 5,
  },
  text_type: {
    color: '#B3AEAD',
    fontSize: 16,
  },
  component_type: {
    marginTop: 20,
    width: '50%',
    borderBottomWidth: 0.5,
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: '#B3AEAD',
  },
  text_type_active: {
    color: '#E32C46',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Medium',
  },
  component_type_active: {
    marginTop: 20,
    width: '50%',
    borderBottomWidth: 2,
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: '#E32C46',
  },
  container_type: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 5,
  },
  locationIcon: {
    // marginTop: 10,
    // marginRight: 5,
  },
  Address_components: {
    // marginLeft: 5,
    width: '90%',
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#B3AEAD',
    borderRadius: 25,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  Address_field: {
    width: '80%',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  component_view: {
    flexDirection: 'column',
  },
  Label: {
    fontSize: 16,
    paddingTop: 5,
    paddingHorizontal: 15,
    fontFamily: 'Roboto-Medium',
    marginTop: 5,
    // textDecorationLine: 'underline',
    // textDecorationColor: '#B3AEAD',
  },
  screen: {
    // flex: 1,
    paddingTop: 10,
    backgroundColor: colors.themeWhite,
  },
  rightIcon: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 5,
  },
  descriptionContainer: {
    paddingHorizontal: 15,
    borderTopWidth: 0.5,
    marginTop: 20,
    borderColor: '#B3AEAD',
    paddingTop: 10,
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },

  iconContainer: {
    alignSelf: 'center',
  },
  closeIcon: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 18,
    alignItems: 'center',
    width: 18,
    height: 18,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  iconView: {
    flexDirection: 'row',
    // marginTop: 15,
    alignSelf: 'center',
  },
  applyButton: {
    backgroundColor: colors.themeRed,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 30,
    // marginVertical: 10,
    position: 'absolute',
    bottom: 18,
  },
  applyText: {
    color: colors.themeWhite,
    fontSize: 14,
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },

  unitContainer: {
    flexDirection: 'row',
  },
  unitView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  unitText: {
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
    fontFamily: 'Roboto-Regular',
    width: '85%',
  },
  unitInnerContainer: {
    width: '50%',
    marginHorizontal: 5,
  },
  unitInnerrContainer: {
    flexDirection: 'row',
    // marginHorizontal: 5,
    flexWrap: 'wrap',
  },
  unitViews: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 8,
    width: '95%',
    // backgroundColor: 'red',
  },
  unitMainViews: {
    width: '50%',
    // paddingHorizontal: 10,
  },
  bedroomText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  propertyImage: {
    marginHorizontal: 2,
    width: 17,
    height: 17,
  },
});

export default UserFilter;
