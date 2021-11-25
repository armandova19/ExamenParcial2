import React, {useState}from "react";
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal } from "react-native";
import {COLORS, SIZES} from '../constants';
import data from '../data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons'

const Quiz = () =>{

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setshowScoreModal] = useState(false);

    const validateAnswer =(selectedOption)=>{
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if(selectedOption==correct_option){
            setScore(score+1)
        }
        setShowNextButton(true)
    }

    const handleNext = () =>{
        if(currentQuestionIndex == allQuestions.length-1){
            setshowScoreModal(true)

        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
    
    }

    const restartQuiz = () =>{
        setshowScoreModal(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
    }

    const renderQuestion = () =>{
        return(
            <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight:2}}>{currentQuestionIndex +1}</Text>
                    <Text style={{color: COLORS.white, fontSize:18, opacity: 0.6}}>/{allQuestions.length }</Text>
                </View>
                <Text style={{
                    color: COLORS.white,
                    fontSize: 30
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }

    const renderOptions = () =>{
        return(
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option =>(
                        <TouchableOpacity
                        onPress={()=> validateAnswer(option)}
                        key={option}
                        style={{
                            borderWidt: 3, borderColor: COLORS.secondary+'40',
                            backgroundColor: COLORS.secondary+'20',
                            height: 60, borderRadius: 20,
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal:20,
                            marginVertical: 10
                        }}>
                            <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>

                           {
                                option==correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius:30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20,
                                        }}></MaterialCommunityIcons>
                                    </View>
                                ):option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius:30/2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20,
                                        }}></MaterialCommunityIcons>
                                    </View>
                                ): null
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    const renderNextButton = ()=>{
        if(showNextButton){
            return(
                <TouchableOpacity 
                onPress={handleNext}
                style={{
                    marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 6
                }}>
                    <Text style={{fontSize:20, color: COLORS.white, textAlign:'center'}}>Next</Text>
                </TouchableOpacity>
            )
        }else{
            return null
        }
    }


    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary}/>
            <View style={{
                flex:1,
                paddingVertical: 40,
                paddingHorizontal: 16,
                backgroundColor: COLORS.background,
                position: 'relative',
            }}>
            

            {renderQuestion()}

            {renderOptions()}
            {renderNextButton()}

            <Modal animationType='slide'
            transparent={true}
            visible={showScoreModal}>
                <View style={{
                    flex:1,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{color: COLORS.white ,fontSize:30, fontWeight: 'bold',}}>{score> (allQuestions.length/2) ? 'congratulations' : 'opps'}</Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems:'center',
                        marginVertical:20
                    }}>
                        <Text style={{color: COLORS.white, fontSize: 25}}>{score}</Text>
                        <Text style={{color: COLORS.white, fontSize: 15}}>/{allQuestions.length}</Text>

                    </View>

                    <TouchableOpacity 
                    onPress={restartQuiz}
                    style={{
                        backgroundColor:COLORS.accent,
                        padding: 20, width: '100%', borderRadius: 20
                    }}>
                        <Text style={{
                            textAlign: 'center', color: COLORS.white, fontSize: 20
                        }}> Volver Quiz</Text>

                    </TouchableOpacity>


                </View>
            </Modal>

            <Image source={require('../assets/images/question2.jpg')}
              style={{
                  width: SIZES.width,
                  height: 130,
                  zIndex:-1,
                  position:'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  opacity: 0.5
              }}
              resizeMode={'contain'}
              />
            </View>

        </SafeAreaView>
    );
};

export default Quiz