import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';

import MainButton from '../MainButton';
import {
  CloseContainer,
  DonateInput,
  DonationBG,
  DonationContainer,
  DonationText,
} from './styles';
import { ProjectsContext } from '../../Contexts/ProjectContext';
import { AssociationContext } from '../../Contexts/AssociationsContext';
import { Alert } from 'react-native';

interface StripeReturn { paymentIntent: string, ephemeralKey: string, customer: string }

export interface DonateModalProps {
  shown: boolean;
  closeCb: () => void;
  projectId: string;
  isAssociation: boolean;
}

const DonateModal = (props: DonateModalProps): JSX.Element => {
  const { t } = useTranslation();
  const {
    shown, closeCb, projectId, isAssociation,
  } = props;
  const { donate: donateAssos, donateWithStripeAsso, getAssociation } = useContext(AssociationContext);

  const { donate: donateProj, donateWithStripeProject, getProjects } = useContext(ProjectsContext);
  const [nbInput, setNbInput] = useState('');
  const [nbInputStripe, setNbInputStripe] = useState('');
  const { goBack } = useNavigation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  if (!shown) return <></>;
  return (
    <DonationBG>
      <DonationContainer>
        <CloseContainer>
          <TouchableOpacity onPress={closeCb}>
            <AntDesign name="closecircleo" size={24} color="black" />
          </TouchableOpacity>
          <DonationText>{t('make_a_donation')}</DonationText>
        </CloseContainer>
        <DonateInput
          keyboardType="numeric"
          placeholder={t('amount')}
          defaultValue={nbInput}
          onChangeText={(input: string): void => {
            setNbInput(input);
          }}
        />
        <TouchableOpacity
          onPress={(): void => {
            if (isAssociation) {
              donateAssos(projectId, parseFloat(nbInput.replace(',', '.'))).then(() => {
                closeCb();
                goBack();
              });
            } else {
              donateProj(projectId, parseFloat(nbInput.replace(',', '.'))).then(() => {
                closeCb();
                goBack();
              });
            }
          }}
          style={{ marginTop: 15 }}
        >
          <MainButton text={t('Donate')} />
        </TouchableOpacity>
        <DonationText style={{ marginTop: 20, marginBottom: 20 }}>{t('make_a_donation_with_stripe')}</DonationText>
        <DonateInput
          keyboardType="numeric"
          placeholder={t('amount')}
          defaultValue={nbInputStripe}
          onChangeText={(input: string): void => {
            setNbInputStripe(input);
          }}
        />

        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={async (): Promise<void> => {
            if (isAssociation) {
              donateWithStripeAsso(projectId, parseFloat(nbInputStripe.replace(',', '.'))).then(async (value: StripeReturn | undefined) => {
                if (value === undefined) {
                  closeCb();
                  goBack();
                  return;
                }
                const { paymentIntent, ephemeralKey, customer } = value;
                await initPaymentSheet({
                  customerId: customer,
                  customerEphemeralKeySecret: ephemeralKey,
                  paymentIntentClientSecret: paymentIntent,
                  merchantDisplayName: 'Fundy',
                });
                const { error: err } = await presentPaymentSheet();
                if (err) {
                  Alert.alert('Une erreur est survenue', "Votre paiement n'a pas été éffectué");
                  console.log(err);
                } else {
                  await getAssociation();
                  Alert.alert('Merci pour votre don', "Votre paiement a été éffectué");
                  closeCb();
                  goBack();
                }
              });
            } else {
              donateWithStripeProject(projectId, parseFloat(nbInputStripe.replace(',', '.'))).then(async (value: StripeReturn | undefined) => {
                if (value === undefined) {
                  closeCb();
                  goBack();
                  return;
                }
                const { paymentIntent, ephemeralKey, customer } = value;
                await initPaymentSheet({
                  customerId: customer,
                  customerEphemeralKeySecret: ephemeralKey,
                  paymentIntentClientSecret: paymentIntent,
                  merchantDisplayName: 'Fundy',
                });
                const { error: err } = await presentPaymentSheet();
                if (err) {
                  Alert.alert('Une erreur est survenue', "Votre paiement n'a pas été éffectué");
                  console.log(err);
                } else {
                  await getProjects();
                  Alert.alert('Merci pour votre don', "Votre paiement a été éffectué");
                  closeCb();
                  goBack();
                }
              });
            }
          }}
        >
          <MainButton text={t('Donate')} />
        </TouchableOpacity>
      </DonationContainer>
    </DonationBG>
  );
};

export default DonateModal;
