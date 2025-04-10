
import image1 from '../Hostel Page/images/image1.png'
import image2 from '../Hostel Page/images/hostelpage_cover.jpeg'
// import React, { useState, useEffect } from 'react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar'
import Team_card from '../NeHa/Team_card'
import Team_grid from '../NeHa/Team_grid'
import './About_neha.css'
import '../About US/about.css'
import Partners from '../Partners'
import Footer from '../Footer';
import { motion } from 'framer-motion';
import student from '../About US/Student_login.jpeg'

const images = [image1, image2, image2]; // Array of images

const HostelSlider = () => {

  const [introData, setIntroData] = useState(null);
  const [arrayData, setArrayData] = useState([]);

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const introRes = await axios.get('https://hostel-sewa-node.onrender.com/api/intro-array/get-intro/2');
        const arrayRes = await axios.get('https://hostel-sewa-node.onrender.com/api/intro-array/get-array/2');
        setIntroData(introRes.data);
        setArrayData(arrayRes.data);
      } catch (err) {
        console.error('Failed to fetch intro or array:', err.message);
      }
    };
    fetchIntro();
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <>
      <Navbar />

      {/* Image Slider */}
      {/* <motion.div className="slider-container">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Hostel"
          className="slider-image"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={imageVariants}
        />
        <button className="left-arrow" onClick={goToPrevious}>
          &#10094;
        </button>
        <button className="right-arrow" onClick={goToNext}>
          &#10095;
        </button>
      </motion.div> */}

      {/* About Section */}
      {
        introData && (
          <div className="introduction-container">
        <div className="introduction-text">
          <h2>Nepal Hostel Association (NEHA)</h2>
          <p>
            {introData.intro}
          </p>
        </div>
        <div className="introduction-image">
          <img src={introData.image} alt="Hostel Sewa Introduction" />
        </div>
      </div>
        )
      }
      
      <Team_card />
      {arrayData && arrayData.length > 0 && (
  <Team_grid team={arrayData} />
)}

      <div className="text-box">

        <p>
          काठमाडौं महानगरपालिकाछात्रावास (होस्टल) सञ्चालनसम्बन्धी मापदण्ड, २०८०
          <br />प्रस्तावना :
          काठमाडौं महानगरपालिका क्षेत्रभित्र सञ्चालन हुने छात्रावास (होस्टल) लाई व्यवस्थित, मर्यादित, सुरक्षित र पारदर्शी बनाई छात्रावासको व्यवस्थापनमा एकरूपता कायम गरी छात्रावासमा बस्ने छात्रछात्राहरू तथा सञ्चालकको अधिकतम् हितलाई सुनिश्चित गर्न तथा छात्रावास व्यवसायीको हकहित र पेशागत मर्यादा कायम गर्न गराउन वान्छनीय भएकोले स्थानीय सरकार सञ्चालन ऐन, २०७४ को दफा ११ (२) को खण्ड (ज) र दफा १०२ (२) को व्यवस्था समेतलाई आधार मानी काठमाडौं महानगरपालिका प्रशासकीय कार्यविधि (नियमित) गर्ने ऐन, २०७५ को दफा ४ बमोजिम नगर कार्यपालिकाले यो मापदण्ड बनाएको छ।
          परिच्छेद -१प्रारम्भिक
          १) संक्षिप्त नाम र प्रारम्भ:क)यस मापदण्डको नाम "छात्रावास (होस्टल) सञ्चालनसम्बन्धी मापदण्ड, २०८० रहेको छ।ख) यो मापदण्ड तुरुन्त प्रारम्भ हुनेछ।
          २) परिभाषा : विषय वा प्रसङ्गले अर्को अर्थ नलागेमा यस मापदण्डमा,
          (क) 'अनुगमन समिति' भन्नाले दफा ८ बमोजिमको अनुगमन समिति सम्झनु पर्छ ।
          (ख) 'छात्रावास' भन्नाले विद्यालय र विश्वविद्यालय तहमा अध्ययनरत छात्रछात्राहरू तथा कुनै सरकारी वा गैह्रसरकारी निकायबाट लिइने परीक्षामा सम्मिलित हुने प्रशिक्षार्थीहरू वा कुनै प्रतिष्ठान वा इन्स्टिच्युटबाट सञ्चालित तालिम वा तयारी कक्षामा सम्मिलित परीक्षार्थी लगायत अन्य जुनसुकै पेसा वा व्यवसायसंग सम्बन्धित व्यक्तिहरूको लागि खाने र बस्ने सुविधासहितको व्यावसायिक रूपमा सञ्चालित आवासलाई सम्झनु पर्छ ।
          (ग) निषेधित चीजवस्तु' भन्नाले धुम्रपान, मादक पदार्थ, गुटखा, पानलगायत अन्य सुर्तीजन्य र नसालु पदार्थ जस्ता प्रचलित कानुनले निषेध गरेको चिजवस्तु सम्झनु पर्छ ।
          (घ) 'महानगरपालिका' भन्नाले काठमाडौ महानगरपालिका सम्झनु पर्छ ।(ङ) मापदण्ड' भन्नाले काठमाडौं महानगरपालिका छात्रावास (होस्टल) सञ्चालनसम्बन्धी मापदण्ड, २०८० सम्झनु प पर्छ।(च) 'वार्डेन' भन्नाले छात्रावासको रेखदेख गर्ने अभिभावकको भूमिकामा रहेको वार्डेन सम्झनु पर्छ ।(छ) 'व्यक्ति भन्नाले प्राकृतिक तथा कानुनी दुवै प्रकृतिको व्यक्ति सम्झनु पर्छ ।(ज) 'सञ्चालक' भन्नाले छात्रावास सञ्चालन गर्ने व्यवसायी सञ्चालक सम्झनु पर्छ ।(झ) 'सम्बन्धित संस्था' भन्नाले नेपाल होस्टल एसोसिएसन र होस्टल व्यवसायी संघ सम्झनु पर्छ र सो शब्दले छात्रावास व्यवसायीको पेसागत हकहित, आपसी समन्वय वा सहजीकरणका लागि स्थापना भएका अन्य संघ वा संस्थालाई समेत जनाउँछ ।
          परिच्छेद २छात्रावास सम्बन्धि ब्यवस्था ३) छात्रावास सञ्चालन गर्न स्वीकृति लिनुपर्ने : (क) महानगरपालिका क्षेत्रभित्र छात्रावास सञ्चालन गर्ने व्यक्तिले महानगरपालिकाबाट स्वीकृति लिनुपर्ने
          (ख) उपदफा (क) बमोजिम स्वीकृति लिन देहायका कागजातसहित निवेदन पेस गर्नुपर्नेछ।
          क(क) विस्तृत कार्ययोजनासहितको अनुसूची-१ बमोजिमको छात्रावास सञ्चालनसम्बन्धी प्रस्ताव |
          (ख) अनुसूची २ बमोजिम छात्रावास सञ्चालन गर्ने प्रतिबद्धतासहितको निवेदन ।
          (ग) छात्रावास सञ्चालन गर्ने क्षेत्रको वडा कार्यालयको सिफारिसपत्र ।
          (घ) सम्बन्धित संस्थाको सिफारिसपत्र ।
          (ङ) छात्रावास सञ्चालक / वार्डेनको नागरिकता प्रमाणपत्रको प्रतिलिपि ।
          (च) छात्रावास सञ्चालन गर्ने भवनको नक्सा र नक्सापास प्रमाणपत्र वा निमार्ण सम्पन्न प्रमाणपत्रको प्रतिलिपि ।
          (छ) छात्रावास सञ्चालन गर्ने घर ( आफ्नो भएमा जग्गाधनी प्रमाणपुर्जा) र भाडामा लिइएको भए घरबहाल सम्झौतापत्रको प्रतिलिपि ।
          (३) यस दफाबमोजिम छात्रावास सञ्चालन गर्न अनुमति लिन चाहने व्यक्तिले महानगरपालिकाको शिक्षा विभागमा निवेदन पेस गर्नुपर्नेछ ।
          (४) उपदफा (३) बमोजिम पेस भएको निवेदन सम्बन्धमा विभागले प्रारम्भिक रूपमा निवेदनसाथ संलग्न कागजातको अध्ययन गरी रायसहित अनुगमन समितिमा पेस गर्नेछ ।
          (५) उपदफा (३) बमोजिम पेस भएको रायसहितको निवेदन सम्बन्धमा समितिले स्थलगत अध्ययन तथा अवलोकन र सुपरीवेक्षण गरी मापदण्ड पूरा भएको वा हुने अवस्था देखिएमा छात्रावास सञ्चालन गर्न अनुमति दिने निर्णय गर्नेछ/
          ६) अनुगमन समितिको निर्णयबमोजिम शिक्षा विभागले तोकिएबमोजिमको सर्तमा छात्रावास सञ्चालन गर्न अनुमतिपत्र जारी गर्नेछ ।
          ४. छात्रावास सञ्चालनको आधारभूत मापदण्ड
          महानगरपालिका क्षेत्रभित्र सञ्चालन हुने छात्रावासको पचमोजिमको हुनेछ । आधारभूत मापदण्ड देहायबमोजिमको हुनेछ
          (१) छात्रावासमा न्यूनतम् भौतिक पूर्वाधार (जस्तै : शौचालय, भान्साघर, पानी आपूर्ति, विद्युत आपूर्ति, फोहरमैला व्यवस्थापन आदि) को सुविधा र छात्रावास परिसरमा उचित सरसफाइको व्यवस्था हुनुपर्नेछ ।
          (२) छात्रावासको प्रत्येक कोठा फराकिलो, खुल्ला,पर्याप्त प्रकाश तथा हावा छिर्ने प्रकृतिको हुनुपर्नेछ ।
          (३) छात्रावासमा प्रत्येक छात्रछात्राहरूका लागि पलङ, दराज, टेबुलको व्यवस्था हुनुपर्नेछ ।
          (४) छात्रावास भवन कुनै पनि विपद् (बाढी, पहिरो, आगजनी, भुकम्प आदि) को जोखिम नहुने खालको हुनुपर्नेछ ।
          (५) छात्रावासमा फायर फाइटिङ उपकरणहरू जस्तै : फायर एक्सटिङगुइसर प्रस्ट देखिने ठाउमा अनिवार्यतः राख्नु पर्नेछ ।
          (६) छात्रावास सञ्चालन गर्दा छात्रावासमा रहेका विद्यार्थीहरूका लागि आपत्कालीन अवस्थामा प्राथमिक स्वास्थ्य उपचार सेवा सुविधा उपलब्ध गराउनुपर्नेछ ।
          (७) छात्रावासको स्नान गृहमा उचित भेण्टिलेसनको व्यवस्था गरेको हुनुपर्नेछ ।
          (८) छात्रावासको (कोठा र शौचालय बाहेक) अन्य आवश्यक भागको निगरानी हुने गरी सिसिटिभी जडान गरेको हुनुपर्नेछ।
          (९) छात्र र छात्रा दुवैको लागि छात्रावास सञ्चालन गर्ने भएमा त्यस्ता भवनहरू नजिकमा आमनेसामने नभई कम्तिमा २०० मिटरको दुरी कायम गरी व्यवस्थापन गर्नुपर्नेछ ।
          (१०) छात्रावास भवन कुनै प्रकारको हुलदङ्गा र प्रदुषण आदिको जोखिम नभएको स्थानमा हुनुपर्नेछ ।
          (११) छात्रावास सञ्चालकले छात्रावासमा स्वच्छ शैक्षिक वा प्राज्ञिक वातावरण कायम गर्न आवश्यक व्यवस्था गर्नुपर्नेछ ।
          (१२) छात्र र छात्रा दुवैको लागि छात्रावास सञ्चालन गर्ने भएमा सम्पूर्ण आन्तरिक सञ्चालनसहितको व्यवस्थापन अलगअलग भवनबाट सञ्चालन गरेको हुनुपर्नेछ ।
          (१३) छात्रछात्राहरूबिचको नातासम्बन्ध दाम्पत्य भए पनि पति र पत्नी एउटै छात्रावासमा बस्न पाइनेछैन तर, सञ्चालक र छात्रावासका कर्मचारीको हकमा भने यो प्रावधान लागु हुनेछैन/
          (१४) छात्रावासको साइनबोर्ड सार्वजनिक रूपमा महानगरपालिकाले तोकेको आकार, प्रकार, रङ र स्थानमा प्रष्ट देखिने र बुझिने गरी दर्ता नम्बरसमेत उल्लेख गरेर राख्नुपर्नेछ ।
          १५) छात्रावासले उपलब्ध गराउने सेवा, सुविधा, सेवा शुल्क, जिम्मेवारी तथा कर्तव्यहरू, गोपनीयता, अनुशासनसम्बन्धी आचारसंहिता, उजुरी आदि समेटिएको आन्तरिक नियम र आचारसंहिता बनाई लागु गर्नुपर्नेछ । त्यस्ता नियम र आचारसंहिता लागु गर्नुपूर्व महानगरपालिकामा पेस गरी महानगरपालिकाको सहमति प्राप्त भएको हुनुपर्नेछ ।
          (१६) छात्रावास सञ्चालनको मापदण्ड तथा आन्तरिक आचारसंहिता प्रष्ट देखिने गरी छात्रावासमा राख्नुपर्नेछ ।
          (१७) छात्रावास सञ्चालन गर्दा उपभोक्ता संरक्षण ऐन, २०७५ तथा अन्य प्रचलित कानुनअन्तर्गत रही कार्य गर्नुपर्नेछ ।
          (१८) छात्रावासमा बस्ने सबैको हालसालै खिचिएको पासपोर्ट साईजको फोटो, नेपाली नागरिकताको प्रमाणपत्रको प्रतिलिपि वा परिचय खुल्ने कुनै सरकारी कागजातको प्रतिलिपिसहित छुट्टाछुट्टै व्यक्तिगत विवरण सहितको फारम अद्यावधिक गरेको हुनुपर्नेछ ।
          (१९) छात्रावासमा बस्ने छात्रछात्रा बाहिर जाने र भित्र प्रवेश गर्ने समय र अनुमतिसम्बन्धी प्रावधान स्पष्ट हुनुपर्नेछ । साथै, छात्रावासमा विनाअनुमति बाहिरको असम्बन्धित व्यक्ति भित्र प्रवेश गर्न नपाउने व्यवस्था मिलाउनुपर्नेछ । बाहिर जाँदा तथा भित्र प्रवेश गर्दाको विवरण खुल्ने गरी लगबुक राख्नुपर्नेछ । तर, नियमित समूहगत रूपमा हुने अध्ययन तथा अध्यापनको हकमा भने लगबुकको व्यवस्था अनिवार्य भएको मानिने छैन ।
          (२०) छात्रावासमा कुनै प्रकारको लागुपदार्थ, मदिराजन्य तथा सुर्तीजन्य पदार्थ ओसारपसार, बिक्री वितरण र सेवन गर्न पाइनेछैन । त्यस्ता निषेधित वस्तुको सेवन वा बिक्री वितरण वा ओसारपसार गरेको भेटिएमा सञ्चालक र सेवाग्राही दुवैलाई कडा कारवाही गरिनेछ ।
          (२१) सञ्चालकबाट परिपक्व अभिभावकीय भूमिका निर्वाह गर्नुपर्ने भएकाले निजको उमेर ३० वर्ष पूरा भएको हुनुपनेछ ।
          (२२) छात्रावास सञ्चालन गर्नुपूर्व सम्बन्धित संस्थाले प्रदान गर्ने छात्रावास सञ्चालनसम्बन्धी तालिम अनिवार्य का रूपमा लिएको हुनुपर्नेछ ।
          (२३) छात्रावास दर्ता भएको मितिले ६ महिनाभित्र सञ्चालन गरिसकेको हुनुपर्नेछ । सोको जानकारी महानगरपालिकालाई दिनुपर्नेछ । अगर
          (२४) प्रत्येक छात्रावासले लेखापरीक्षण गरी सोसमेत संलग्न गरी विस्तृत विवरणसहितको तयार गरेको वार्षिक प्रतिवेदन प्रत्येक आर्थिक वर्षको पुस मसान्तभित्र महानगरपालिकामा पेश गर्नुपर्नेछ।

          परिच्छेद ३
          छात्रावाससँग सम्बद्ध व्यक्तिको काम, कर्तव्य र अधिकार
          ५. सञ्चालकको काम, कर्तव्य र अधिकार : छात्रावास काम, कर्तव्य र अधिकार देहायबमोजिम हुनेछ ।
          (क) आफू सञ्चालक भएको सूचना दिन आफ्नो नाम, नम्बर, ठेगाना र हालसालै खिचेको फोटो सहितको विवरण भएको परिचय पाटी छात्रावास कार्यालयमा सबैले देख्ने ठाउँमा राखेको हुनुपर्नेछ ।
          (ख) छात्रावासबाट बाहिर निस्कने माध्यमहरू (अर्थात् ढोका, हलवे, प्रवेश, आकस्मिक मार्ग, हलहरू) अवरोधबाट मुक्त र मर्मत गरी अद्यावधिक अवस्थामा राख्नुपर्नेछ ।
          (ग) सञ्चालकले सबै फायर फाइटिङ उपकरण (फायर एक्सटिङगुइसर) अनिवार्य रूपमा उपयोगमा आउन सक्ने अवस्थामा राख्नुपर्नेछ ।
          (घ) सञ्चालकले छात्रावास सञ्चालन गर्ने भवनको छत वा बालकोनीलाई सुरक्षित बनाउनको लागि उचित उपायहरू अपनाएको हुनुपर्नेछ
          (ङ) सञ्चालकले छात्रछात्राहरूलाई सम्भावित दुर्घटनाहरूबाट बचाउनको लागि भयालमा बारहरू वा अन्य प्रबन्ध गरी सुरक्षा सुनिश्चित गर्नुपर्नेछ
          (च) सञ्चालकले पानी भण्डारणको लागि प्रयोग गरिएको कुनै ट्याङ्की वा इनार ढाकिएको छ र कुनै पनि पानी फिटिङ क्षतिबाट सुरक्षित छ भनी सुनिश्चित गर्नुपर्नेछ ।
          (छ) सञ्चालकले विद्युतीय सेवाको निरीक्षण गर्नुपर्नेछ  र निरन्तर सुरक्षित रहे वा नरहेको परीक्षण गर्नुपर्नेछ।(ज) सञ्चालकले छात्रावासको मूल भवन र त्यसको परिसर तथा बगैंचासमेत मर्मत गरी सफा र राम्रो अवस्थामा राख्नुपर्नेछ ।कुनै पनि सीमा पर्खाल, बार र रेलिङ राम्रोसँग मर्मत गरेर सुरक्षित राख्नुपर्नेछ ।
          (ञ) अनुगमन समितिले अनुगमन गरी दिएको निर्देशन परिपालना गर्नुपर्नेछ ।
          ६. वार्डेनको काम, कर्तव्य र अधिकार : वार्डेनको काम, कर्तव्य र अधिकार देहायबमोजिम हुनेछ :
          (क) वार्डेनले छात्रावासमा निरन्तर निगरानी राख्नुपर्नेछ ।
          ख) वार्डेनले छात्र / छात्रा बाहिर गएको समय र छात्रावासमा फर्केको समय लगबुकमा दर्ता गरी अद्यावधिक गरी राख्नुपर्नेछ ।ग) वार्डेनले पानी, बिजुली तथा अन्य वस्तुहरूमा समस्या आएमा सञ्चालकलाई जानकारी गराउनुपर्नेछ ।
          (घ) वार्डेनले छात्रछात्राहरूको समस्यालाई समाधान गर्नुपर्नेछ र सञ्चालकलाई जानकारी गराउनुपर्नेछ ।
          ङ) छात्रछात्राहरूबिच कुनै विवाद उत्पन्न भएमा दुवै पक्षलाई राखी आ-आफ्नो तर्फबाट सफाइ दिने मौका दिई विवाद समाधान गर्नुपर्नेछ ।
          (च) वार्डेनले कुनै पनि छात्रछात्राले नियम विपरीत कार्य गरेमा आन्तरिक आचारसंहिता बमोजिम आवश्यकताअनुसार कारवाही (कार्यको गम्भीरताको आधारमा प्रक्रिया पूरा गरी निस्कासित समेत) गर्न सक्नेछ ।छ) वार्डेनले आवश्यकताअनुसार नियमहरू सच्याउन सक्नेछ तर त्यस्ता नियमहरूको जानकारी महानगरपालिका र सञ्चालकलाई तुरुन्तै दिनुपर्नेछ।(ज) छात्रावासमा बसोबास गर्ने छात्रछात्राले कुनै विषयमा गुनासो गर्नुपर्ने भएमा छात्रावासको सम्बद्ध पदाधिकारी र महानगरपालिका तथा वडाको सम्बद्ध पदाधिकारीको समेत नाम र सम्पर्क नम्बर सबैले देख्ने गरी राख्नुपर्नेछ ।
          ७. छात्र/ छात्राको काम, कर्तव्य र अधिकार : छात्रावासमा साझा बसोवास गर्ने छात्र/छात्राले पालना गर्नुपर्ने काम, कर्तव्य र अधिकार देहायबमोजिम हुनेछ।
          (१) छात्र / छात्राले छात्रावासबाट जारी भएको आफूले परिपालना गर्नुपर्ने आचारसंहिता, छात्रावासबाट उपलब्ध हुने सेवा तथा सुविधाहरूबारे सुसूचित हुनुपर्नेछ ।
          (२) छात्र / छात्राले छात्रावासको आन्तरिक नियम तथा संहिताको परिपालना गर्नुपर्नेछ ।
          (३) छात्रावासले तोकेको परिसरभित्र बस्नुपर्नेछ ।
          (४) अरुलाई कुनै किसिमको भेदभाव, अपहेलना वा होहल्ला गर्न, अरुलाई असर गर्ने गरी गीत बजाउन वा नाचगान गर्न वा अन्य अराजक क्रियाकलाप गर्न पाइनेछैन ।
          ५) आफू छात्रावास परिसरबाट बाहिर जानुअघि । वार्डेन वा सञ्चालकको अनुमति लिनुपर्नेछ ।(६) आफू छात्रावास परिसर बाहिर गएको स्थान, प्रयोजन, समय र फर्किएको समय लगबुकमा नियमित र अनिवार्य लेख्नुपनेछ ।७) छात्रावासमा रहेको जुनसुकै वस्तु तथा भौतिक संरचनाको संरक्षण गर्नुपर्नेछ । कुनै किसिमको तोडफोड गर्ने जस्ता कार्य गर्नुहुँदैन । त्यस्तो कार्य गरेमा वा बिगार गरेमा उचित क्षतिपूर्ति बेहोर्नुपर्नेछ ।
          ८) छात्रावासभित्र कुनै विवाद परेमा तुरुन्तै वार्डेनलाई जानकारी दिई विवाद समाधानमा सहयोग गर्नु पर्नेछ ।
          ९) वार्डेनले कुनै गैह्रकानुनी वा यस मापदण्ड- विपरीत कार्य गरे वा गराएमा सञ्चालकलाई र सञ्चालकले त्यस्तो कार्य गरेमा यथासम्भव छिटो सम्बन्धित संस्थालाई जानकारी गराउनुपर्नेछ ।(१०) छात्रावासमा बस्ने छात्र / छात्रा अनुशासित, मर्यादित, विनयशील, लगनशील सामूहिक भावनामा विश्वस्त हुनुपर्नेछ । आफ्नो कारणले कुनै भवितव्यको घटना भएमा स्वयम् जिम्मेवार हुनुपर्नेछ ।(११) छात्र/छात्रालाई कुनै पनि असुविधा भई वार्डेन वा सञ्चालक वा दुवैलाई सोको जानकारी दिँदासमेत बेवास्ता गरेमा वा चासो नदिएमा सो उपर सम्बन्धित संस्था वा नजिकको प्रहरी वा सम्बन्धित वडा कार्यालय वा न्यायिक समितिमा गुनासो टिपाउने वा उजुरी गर्नुपर्नेछ ।
        </p>
      </div>

      <Partners />
      <Footer />
    </>
  );
};

export default HostelSlider;

