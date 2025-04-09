import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Card,
  CardContent,
  Typography,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
// import Header from "../../components/Header";
import { useState } from "react";  // Add this with other imports
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "https://hostel-sewa-node.onrender.com/api/hostel/registerhostel",
        values
      );
      console.log("Hostel registered successfully:", response.data);
      alert("Hostel registered successfully!");
      resetForm();
    } catch (error) {
      console.error("Error registering hostel:", error.response?.data || error.message);
      alert("Failed to register hostel. Please try again.");
    }
  };
  const provincesData = {
    "Province 1": {
      districts: {
        "Bhojpur": ["Shadanand", "Tyamke Maiyunm", "Salpasilichho"],
        "Dhankuta": ["Pakhribas", "Mahalaxmi", "Sangurigadhi"],
        "Ilam": ["Ilam", "Deumai", "Mai", "Suryodaya"],
        "Jhapa": ["Bhadrapur", "Arjundhara", "Gauradaha", "Kankai"],
        "Khotang": ["Diktel", "Rupakot Majhuwagadhi", "Halesi Tuwachung"],
        "Morang": ["Biratnagar", "Urlabari", "Belbari", "Rangeli"],
        "Okhaldhunga": ["Siddhicharan", "Champadevi", "Sunkoshi"],
        "Panchthar": ["Phidim", "Hilihang", "Yangwarak"],
        "Sankhuwasabha": ["Khandbari", "Chainpur", "Makalu"],
        "Solukhumbu": ["Solu Dudhkunda", "Khumbu Pasang Lhamu", "Likhu"],
        "Sunsari": ["Inaruwa", "Duhabi", "Itahari", "Dharan"],
        "Taplejung": ["Phungling", "Sidingwa", "Meringden"],
        "Terhathum": ["Myanglung", "Aathrai", "Chhathar"],
        "Udayapur": ["Triyuga", "Katari", "Chaudandigadhi"]
      }
    },
    "Madhesh Province": {
      districts: {
        "Bara": ["Kalaiya", "Jitpur Simara", "Kolhabi", "Pheta"],
        "Dhanusha": ["Janakpur", "Mithila", "Dhanushadham", "Bateshwar"],
        "Mahottari": ["Jaleshwar", "Bardibas", "Gaushala", "Matihani"],
        "Parsa": ["Birgunj", "Pokhariya", "Bahudaramai", "Sakhuwa Prasauni"],
        "Rautahat": ["Gaur", "Chandrapur", "Garuda", "Brindaban"],
        "Saptari": ["Rajbiraj", "Hanumannagar", "Kanchanrup", "Khadak"],
        "Sarlahi": ["Malangwa", "Haripur", "Barahathawa", "Ishwarpur"],
        "Siraha": ["Siraha", "Lahan", "Mirchaiya", "Golbazar"]
      }
    },
    "Bagmati Province": {
      districts: {
        "Bhaktapur": ["Bhaktapur", "Changunarayan", "Suryabinayak", "Madhyapur Thimi"],
        "Chitwan": ["Bharatpur", "Ratnanagar", "Kalika", "Rapti"],
        "Dhading": ["Dhunibesi", "Nilkantha", "Galchhi", "Gajuri"],
        "Dolakha": ["Bhimeshwar", "Jiri", "Bigu", "Kalinchok"],
        "Kathmandu": ["Kathmandu", "Kageshwari-Manohara", "Budhanilkantha", "Tokha"],
        "Kavrepalanchok": ["Dhulikhel", "Banepa", "Panauti", "Panchkhal"],
        "Lalitpur": ["Lalitpur", "Godawari", "Mahalaxmi", "Konjyosom"],
        "Makwanpur": ["Hetauda", "Thaha", "Bhimphedi", "Manahari"],
        "Nuwakot": ["Bidur", "Kakani", "Tadi", "Likhu"],
        "Ramechhap": ["Manthali", "Ramechhap", "Umakunda", "Khandadevi"],
        "Rasuwa": ["Dhunche", "Gosaikunda", "Kalika", "Uttargaya"],
        "Sindhuli": ["Kamalamai", "Marin", "Sunkoshi", "Golanjor"],
        "Sindhupalchok": ["Chautara", "Bahrabise", "Melamchi", "Lisankhu"]
      }
    },
    "Gandaki Province": {
      districts: {
        "Baglung": ["Baglung", "Galkot", "Jaimuni", "Dhorpatan"],
        "Gorkha": ["Gorkha", "Palungtar", "Sulikot", "Ajirkot"],
        "Kaski": ["Pokhara", "Machhapuchchhre", "Annapurna", "Madi"],
        "Lamjung": ["Besisahar", "Sundarbazar", "Madhya Nepal", "Rainas"],
        "Manang": ["Chame", "Narphu", "Neshyang", "Manang"],
        "Mustang": ["Jomsom", "Thasang", "Barhagaun Muktikshetra", "Lomanthang"],
        "Myagdi": ["Beni", "Annapurna", "Mangala", "Raghuganga"],
        "Nawalpur": ["Kawasoti", "Madhyabindu", "Binayi Tribeni", "Bulingtar"],
        "Parbat": ["Kushma", "Phalebas", "Jaljala", "Mahashila"],
        "Syangja": ["Putalibazar", "Waling", "Arjun Chaupari", "Galyang"],
        "Tanahun": ["Damauli", "Bhanu", "Shuklagandaki", "Rishing"]
      }
    },
    "Lumbini Province": {
      districts: {
        "Arghakhanchi": ["Sandhikharka", "Sitganga", "Bhumikasthan", "Chhatradev"],
        "Banke": ["Nepalgunj", "Kohalpur", "Narainapur", "Rapti Sonari"],
        "Bardiya": ["Gulariya", "Barbardiya", "Madhuwan", "Rajapur"],
        "Dang": ["Ghorahi", "Tulsipur", "Lamahi", "Shantinagar"],
        "Eastern Rukum": ["Rukumkot", "Putha Uttarganga", "Sisne", "Bhume"],
        "Gulmi": ["Tamghas", "Resunga", "Isma", "Kaligandaki"],
        "Kapilvastu": ["Kapilvastu", "Banganga", "Shivaraj", "Buddhabhumi"],
        "Parasi": ["Ramgram", "Sunwal", "Pratappur", "Sarawal"],
        "Palpa": ["Tansen", "Rampur", "Rainadevi Chhahara", "Mathagadhi"],
        "Pyuthan": ["Pyuthan", "Sworgadwary", "Mandavi", "Jhimruk"],
        "Rolpa": ["Liwang", "Runtigadhi", "Sunilsmriti", "Triveni"],
        "Rupandehi": ["Siddharthanagar", "Butwal", "Lumbini", "Devdaha"]
      }
    },
    "Karnali Province": {
      districts: {
        "Dailekh": ["Narayan", "Dullu", "Aathbis", "Gurans"],
        "Dolpa": ["Dolpo Buddha", "Shey Phoksundo", "Jagadulla", "Mudkechula"],
        "Humla": ["Simkot", "Sarkegad", "Adanchuli", "Kharpunath"],
        "Jajarkot": ["Khalanga", "Bheri", "Nalagad", "Kushe"],
        "Jumla": ["Chandannath", "Tila", "Hima", "Guthichaur"],
        "Kalikot": ["Manma", "Pachaljharana", "Sanni Triveni", "Naraharinath"],
        "Mugu": ["Chhayanath Rara", "Soru", "Khatyad", "Mugum Karmarong"],
        "Salyan": ["Salyan", "Bagchaur", "Shaarda", "Kalimati"],
        "Surkhet": ["Birendranagar", "Bheriganga", "Gurbhakot", "Lekbesi"],
        "Western Rukum": ["Musikot", "Chaurjahari", "Athbiskot", "Banfikot"]
      }
    },
    "Sudurpashchim Province": {
      districts: {
        "Achham": ["Mangalsen", "Kamalbazar", "Panchadewal Binayak", "Chaurpati"],
        "Baitadi": ["Dasharathchand", "Purchaudi", "Dogadakedar", "Sigas"],
        "Bajhang": ["Jayaprithvi", "Bungal", "Talkot", "Surma"],
        "Bajura": ["Budhiganga", "Tribeni", "Budhinanda", "Gaumul"],
        "Dadeldhura": ["Amargadhi", "Ajaymeru", "Ganyapadhura", "Navadurga"],
        "Darchula": ["Darchula", "Shailyasikhar", "Marma", "Lekam"],
        "Doti": ["Dipayal Silgadhi", "Shikhar", "Purbichauki", "K.I. Singh"],
        "Kailali": ["Sanfebagar", "Turmakhad", "Panchadewal", "Dhakari"],
        "Kanchanpur": ["Bhimdatta", "Bedkot", "Krishnapur", "Belauri"]
      }
    }
  };

  const hostelFeatures = [
    "Hot/Cold Water",
    "Reliable WIFI",
    "CC Camera Locker",
    "TV Room",
    "Electricity",
    "Laundry",
    "Peaceful Environment",
    "Study Table",
    "No Smoking",
    "Veg/Non-Veg",
    "4 Time Meals",
    "Pillow",
    "Water Dispenser",
  ];
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);

  // Handle province selection
  // Updated handlers
  const handleProvinceChange = (e, setFieldValue) => {
    const province = e.target.value;
    setFieldValue("province", province);
    const provinceDistricts = Object.keys(provincesData[province]?.districts || []);
    setDistricts(provinceDistricts);
    setAreas([]); // Reset areas
    setFieldValue("district", "");
    setFieldValue("area", "");
  };

  const handleDistrictChange = (e, setFieldValue, currentValues) => { // Rename to currentValues
    const district = e.target.value;
    setFieldValue("district", district);

    // Use currentValues instead of values
    const province = currentValues.province;
    const districtAreas = provincesData[province]?.districts[district] || [];
    setAreas(districtAreas);
    setFieldValue("area", "");
  };

  return (
    <>
    <Navbar/>
    <Box    sx={{
          mt: 4,
          px: { xs: 2, sm: 4 },
          display: "flex",
          justifyContent: "center",
        }} m="20px">
      {/* <Header title="CREATE HOSTEL" subtitle="Add a New Hostel Profile" /> */}
      <Card
       sx={{
        width: "100%",
        maxWidth: "1100px",
        borderRadius: "16px",
        boxShadow: 4,
      }}
      >
        <CardContent
         sx={{ p: { xs: 2, sm: 4 } }}
        >
           <Typography
              variant="h4"
              fontWeight="bold"
              align="center"
              gutterBottom
              sx={{ color: "#1976d2", mb: 4 }}
            >
              Register a New Hostel
            </Typography>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
                    >
                      Hostel Information
                    </Typography>
                  </Grid>

                  {/* Hostel Type Field */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Hostel Type"
                      select
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.type}
                      name="type"
                      error={!!touched.type && !!errors.type}
                      helperText={touched.type && errors.type}
                    >
                      <MenuItem value="Boys">Boys</MenuItem>
                      <MenuItem value="Girls">Girls</MenuItem>
                      <MenuItem value="Co-ed">Co-ed</MenuItem>
                    </TextField>
                  </Grid>

                  {/* Name, Contact, and Address */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Contact"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact}
                      name="contact"
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      name="address"
                      error={!!touched.address && !!errors.address}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      fullWidth
                      label="Province"
                      name="province"
                      value={values.province}
                      onBlur={handleBlur}
                      onChange={(e) => handleProvinceChange(e, setFieldValue)}
                      error={!!touched.province && !!errors.province}
                      helperText={touched.province && errors.province}
                    >
                      {Object.keys(provincesData).map((province) => (
                        <MenuItem key={province} value={province}>
                          {province}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      fullWidth
                      label="District"
                      name="district"
                      value={values.district}
                      onBlur={handleBlur}
                      onChange={(e) => handleDistrictChange(e, setFieldValue, values)} // Pass current values
                      disabled={!values.province}
                      error={!!touched.district && !!errors.district}
                      helperText={touched.district && errors.district}
                    >
                      {districts.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      fullWidth
                      label="Area"
                      name="area"
                      value={values.area}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!values.district || areas.length === 0}
                      error={!!touched.area && !!errors.area}
                      helperText={touched.area && errors.area}
                    >
                      {areas.map((area) => (
                        <MenuItem key={area} value={area}>
                          {area}
                        </MenuItem>
                      ))}
                      {areas.length === 0 && values.district && (
                        <MenuItem disabled>No areas found for this district</MenuItem>
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Map URL"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mapUrl}
                      name="mapUrl"
                      error={!!touched.mapUrl && !!errors.mapUrl}
                      helperText={touched.mapUrl && errors.mapUrl}
                    />
                  </Grid>

                  {/* Price, Rooms, and Bathrooms */}
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Price"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price}
                      name="price"
                      error={!!touched.price && !!errors.price}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Total Rooms"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.totalRooms}
                      name="totalRooms"
                      error={!!touched.totalRooms && !!errors.totalRooms}
                      helperText={touched.totalRooms && errors.totalRooms}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Bathrooms"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bathrooms}
                      name="bathrooms"
                      error={!!touched.bathrooms && !!errors.bathrooms}
                      helperText={touched.bathrooms && errors.bathrooms}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Floors"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.floors}
                      name="floors"
                      error={!!touched.floors && !!errors.floors}
                      helperText={touched.floors && errors.floors}
                    />
                  </Grid>

                  {/* Beds and Students */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Beds"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.beds}
                      name="beds"
                      error={!!touched.beds && !!errors.beds}
                      helperText={touched.beds && errors.beds}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Students"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.students}
                      name="students"
                      error={!!touched.students && !!errors.students}
                      helperText={touched.students && errors.students}
                    />
                  </Grid>

                  {/* Overview */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Overview"
                      multiline
                      rows={3}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.overview}
                      name="overview"
                      error={!!touched.overview && !!errors.overview}
                      helperText={touched.overview && errors.overview}
                    />
                  </Grid>

                  {/* Hostel Features */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Hostel Features:
                    </Typography>
                    <FormGroup row>
                      {hostelFeatures.map((feature) => (
                        <FormControlLabel
                          key={feature}
                          control={
                            <Checkbox
                              checked={values.features.includes(feature)}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setFieldValue("features", [
                                    ...values.features,
                                    feature,
                                  ]);
                                } else {
                                  setFieldValue(
                                    "features",
                                    values.features.filter((f) => f !== feature)
                                  );
                                }
                              }}
                            />
                          }
                          label={feature}
                        />
                      ))}
                    </FormGroup>
                  </Grid>
                </Grid>

                {/* Submit Button */}
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: "20px",
                      boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Create Hostel
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
    <Footer/>
    </>
  );
};

const checkoutSchema = yup.object().shape({
  type: yup
    .string()
    .required("Hostel type is required")
    .oneOf(["Boys", "Girls", "Co-ed"], "Invalid hostel type"),
  name: yup.string().required("Name is required"),
  contact: yup
    .string()
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      "Invalid phone number"
    )
    .required("Contact is required"),
  address: yup.string().required("Address is required"),
  price: yup.number().required("Price is required"),
  totalRooms: yup.number().required("Total Rooms are required"),
  bathrooms: yup.number().required("Bathrooms are required"),
  floors: yup.number().required("Floors are required"),
  beds: yup.number().required("Beds are required"),
  students: yup.number().required("Students are required"),
  overview: yup.string().max(500, "Maximum 500 characters").required("Overview is required"),
  features: yup.array().of(yup.string()),
  province: yup.string().required("Province is required"),
  district: yup.string().required("District is required"),
  area: yup.string().required("Area is required"),
  mapUrl: yup.string().url("Must be a valid URL").required("Map URL is required"),
});

const initialValues = {
  type: "",
  name: "",
  contact: "",
  address: "",
  province: "",
  district: "",
  area: "",
  mapUrl: "",
  price: "",
  totalRooms: "",
  bathrooms: "",
  floors: "",
  beds: "",
  students: "",
  overview: "",
  features: [],
};

export default Form;