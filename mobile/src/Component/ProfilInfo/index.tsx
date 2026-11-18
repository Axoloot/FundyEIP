import React, { useContext, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import pickImage from '../../utils/imagePicker';
import {
  CenteredChild,
  CenteredRow,
  SmallTitleText,

  TextFuturaBold,
} from '../../styles.global';

import {
  ChangeProfilPicture,
  EditButton,
  ProfilImage,
  Container,
  SmallTitleTextInput,
  InputCardContainer,
} from './styles';
import { AuthContext, ModifyUser } from '../../Contexts/AuthContext';

const ProfilInfo = (): JSX.Element => {
  const { t } = useTranslation();
  const { user, editUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState<ModifyUser>({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    profilePicture: user?.profilePicture,
    edited: false,
  });

  useEffect(() => {
    if (!isEditing && newUser.edited) {
      editUser(newUser);
      setNewUser({ edited: false });
    }
  }, [isEditing, newUser, editUser]);

  return (
    <Container>
      <View style={{ alignContent: 'center', flex: 1 }}>
        <ProfilImage
          source={{ uri: user?.profilePicture }}
        />
        {isEditing && (
          <ChangeProfilPicture
            onPress={(): Promise<void> => pickImage(setNewUser)}
          >
            <AntDesign name="camerao" size={30} color="black" />
          </ChangeProfilPicture>
        )}
        {!isEditing && (
          <CenteredRow>
            <SmallTitleText>
              {`${user?.firstname} ${user?.lastname}`}
            </SmallTitleText>
          </CenteredRow>
        )}
        {isEditing
          && (
            <>
              <CenteredRow>
                <InputCardContainer>
                  <SmallTitleTextInput
                    placeholder="firstname"
                    defaultValue={`${user?.firstname} `}
                    onChangeText={(firstname): void => {
                      setNewUser({ firstname, edited: true });
                    }}
                  />
                </InputCardContainer>
                <InputCardContainer>
                  <SmallTitleTextInput
                    placeholder="lastname"
                    defaultValue={user?.lastname}
                    onChangeText={(lastname): void => {
                      setNewUser({ lastname, edited: true });
                    }}
                  />
                </InputCardContainer>

              </CenteredRow>
              <InputCardContainer>
                <SmallTitleTextInput
                  font="15px"
                  placeholder="email"
                  defaultValue={user?.email}
                  onChangeText={(email): void => {
                    setNewUser({ email, edited: true });
                  }}
                />
              </InputCardContainer>
            </>

          )}
        <CenteredChild><Text>{user?.email}</Text></CenteredChild>
      </View>
      <View>
        <EditButton
          isEditing={isEditing}
          onPress={(): void => setIsEditing(!isEditing)}
        >
          <TextFuturaBold>
            {isEditing ? t('Apply') : t('Edit')}
          </TextFuturaBold>
        </EditButton>
      </View>
    </Container>
  );
};

export default ProfilInfo;
