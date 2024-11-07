import {
  Box,
  Container,
  Text,
  useColorMode,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";

export default function AverageQuestions({ feedbacks }) {
  const { colorMode } = useColorMode();
  const [averageRatingsByQuestion, setAverageRatingsByQuestion] = useState([]);
  const [progress, setProgress] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    const calculateAverageRatingsByQuestion = (feedbacks) => {
      const questionRatings = {};

      feedbacks?.forEach((feedback) => {
        feedback.questions.forEach((question) => {
          if (question.questionType === "RATING" && question.rating !== null) {
            const { questionName, rating } = question;

            if (questionRatings[questionName]) {
              questionRatings[questionName].sum += rating;
              questionRatings[questionName].count += 1;
            } else {
              questionRatings[questionName] = { sum: rating, count: 1 };
            }
          }
        });
      });

      return Object.entries(questionRatings).map(
        ([questionName, { sum, count }]) => ({
          questionName,
          averageRating: parseFloat((sum / count).toFixed(1)),
        })
      );
    };

    const averages = calculateAverageRatingsByQuestion(feedbacks);
    setAverageRatingsByQuestion(averages);
    console.log(averages);
  }, [feedbacks]);

  const autoplaySpeed = 9000;

  const settings = {
    dots: averageRatingsByQuestion.length > 1,
    infinite: averageRatingsByQuestion.length > 1,
    speed: 700,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    draggable: false,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          overflow: "hidden",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
          color: "white",
        }}
      >
        <ul style={{ margin: 0 }}>{dots}</ul>
      </div>
    ),
    beforeChange: (current, next) => {
      setTimeout(() => {
        setCurrentIndex(next);
      }, 700);
      setProgress(-2.5);
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 0));
    }, autoplaySpeed / 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <Container
      bgColor={colorMode === "dark" ? "#2b3442" : "transparent"}
      borderRadius="10px"
      border="1px solid"
      borderColor={colorMode === "dark" ? "transparent" : "black"}
      minHeight="200px"
      padding="20px"
      paddingBottom="0px"
      mb="30px"
      display="flex"
      flexDirection="column"
    >
      <Text fontSize="1.4rem" mb="10px">
        <strong>Média de notas por questão</strong>
      </Text>

      <Box
        paddingLeft="20px"
        paddingRight="20px"
        position="relative"
        height="135px"
      >
        <Slider ref={sliderRef} {...settings}>
          {averageRatingsByQuestion.map((question) => (
            <Box
              key={question.questionName}
              height="130px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minWidth="100%"
              position="relative"
            >
              <Box textAlign="center">
                <Heading>{question.questionName}</Heading>
                <Text fontSize="1.2rem">Média: {question.averageRating}</Text>
              </Box>
            </Box>
          ))}
        </Slider>

        {averageRatingsByQuestion.length > 1 ? (
          <>
            <IconButton
              icon={<ChevronLeftIcon />}
              aria-label="Previous Slide"
              position="absolute"
              top="30%"
              left="10px"
              transform="translateY(-50%)"
              onClick={() => {
                sliderRef.current.slickPrev();
                setProgress(-2.5);
              }}
              zIndex={2}
              borderRadius="full"
            />
            <IconButton
              icon={<ChevronRightIcon />}
              aria-label="Next Slide"
              position="absolute"
              top="30%"
              right="10px"
              transform="translateY(-50%)"
              onClick={() => {
                sliderRef.current.slickNext();
                setProgress(-2.5);
              }}
              zIndex={2}
              borderRadius="full"
            />
            <Box
              position="absolute"
              bottom="30px"
              left="30px"
              borderRadius="20px"
              width="100px"
              height="5px"
              backgroundColor="gray.300"
            >
              <Box
                height="100%"
                width={`${100 - progress}%`}
                borderRadius="20px"
                backgroundColor="#971520"
                transition="width 0.1s linear"
              />
            </Box>
          </>
        ) : null}

        <style>{`
          .slick-dots li button:before {
            color: white;
            opacity: 0.5;
          }

          .slick-dots li.slick-active button:before {
            color: #971520;
            opacity: 1;
          }
        `}</style>
      </Box>
    </Container>
  );
}
