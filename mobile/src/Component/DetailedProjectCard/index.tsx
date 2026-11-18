/* eslint-disable complexity */
import React, { useContext, useState } from 'react';
import MapView from 'react-native-maps';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { ActionContainer, ActionText, BackgroundView, CardContainer, MapContainer } from './styles';
import {
  AssocationName,
  blackText,
  darkBackground,
  DescriptionText,
  DescriptionTitle,
  ImageContainer,
  RaisedPercentText,
  whiteBackground,
  whiteText,
} from '../../styles.global';
import Tags from '../Tags';
import ProgressBar from '../ProgressBar';
import Donate from '../Donate';
import DonateModal from '../DonateModal';
import { Association } from '../../Contexts/AssociationsContext';
import { Donation, Project } from '../../Contexts/ProjectContext';
import { AuthContext } from '../../Contexts/AuthContext';
import { ContainerText, DonationContainer, PaymentContainer } from '../Transaction/styles';

export interface DetailedProjectProps {
  project: Project | Association;
  onPress?: () => void;
}

const DetailedProject = ({ project, onPress }: DetailedProjectProps): JSX.Element => {
  const { user } = useContext(AuthContext);
  const {
    name, description, title, goal, image, raisedCurrently, tags, id: projectId, Donations, Actions,
  } = project;
  const [showModal, setShowModal] = useState({ open: false, projectId: '' });


  const themes = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteText : blackText,
  };

  return (
    <ThemeProvider theme={themes}>
      <BackgroundView>
        <TouchableWithoutFeedback onPress={onPress}>
          <>
            <ScrollView style={{ height: '98%' }}>
              <CardContainer>
                <ImageContainer source={{ uri: image ?? '' }} />
                {goal ? <ProgressBar percentage={goal ? ((raisedCurrently / 100) / goal) * 100 : 100} /> : <></>}
                <RaisedPercentText>
                  {goal && `${(((raisedCurrently / 100) / goal) * 100).toFixed(2)} % Raised`}
                </RaisedPercentText>
                <DescriptionTitle>{name}</DescriptionTitle>
                <AssocationName>{title}</AssocationName>
                <Donate
                  onPress={(): void => {
                    setShowModal({ open: true, projectId });
                  }}
                  goal={goal}
                  raisedCurrently={raisedCurrently / 100}
                />
                <DescriptionText>{description}</DescriptionText>
                <Tags tags={tags} />
                {!goal &&
                  <MapContainer>
                    <MapView
                      style={{
                        width: 250,
                        height: 200,
                      }}
                      zoomEnabled={false}
                      scrollEnabled={false}
                      rotateEnabled={false}
                      pitchEnabled={false}
                      initialRegion={{
                        latitude: parseFloat(project.latitude),
                        longitude: parseFloat(project.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    />
                  </MapContainer >
                }
                <ScrollView contentContainerStyle={{ display: 'flex', }}>
                  {
                    //verif le code de divisision
                    Donations.map((item: Donation, idx) => {
                      if (user?.id === item.userId) {
                        return (
                          <View style={{ alignSelf: 'center' }} key={item.id}>
                            <DonationContainer idx={idx}>
                              <ContainerText>
                                {item.createdAt.toString().substring(10, 0)}
                              </ContainerText>
                              <ContainerText>
                                {item.amount / 100}
                                €
                              </ContainerText>
                            </DonationContainer>
                          </View>
                        );
                      }
                      return <></>;
                    })
                  }
                  {
                    Actions.map((item) => {
                      return (
                        <ActionContainer key={item.id}>
                          <ActionText>{item.title}</ActionText>
                          <ActionText>{item.description}</ActionText>
                        </ActionContainer>
                      );
                    })
                  }
                </ScrollView>
              </CardContainer>
            </ScrollView>
            <DonateModal
              shown={showModal.open}
              closeCb={(): void => { setShowModal({ open: false, projectId: '' }); }}
              isAssociation={!goal}
              projectId={showModal.projectId}
            />
          </>
        </TouchableWithoutFeedback>
      </BackgroundView>
    </ThemeProvider>
  );
};

export default DetailedProject;
