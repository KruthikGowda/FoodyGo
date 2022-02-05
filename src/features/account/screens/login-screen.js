import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ActivityIndicator } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <AccountCover />
      <Title>FoodyGo</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        {error && (
          <Spacer size="large">
            <ErrorContainer size="large">
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          </Spacer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color="#FF6347" />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
