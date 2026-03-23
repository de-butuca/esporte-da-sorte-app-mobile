import { BasePage } from '@/components/BasePage';
import { InputText } from '@/components/form/inputs/InputTextUI/InputTextUI';
import { ButtonBase } from '@/components/Button';
import { SL } from './styles';
import { useLoginViewModel } from './login.viewmodel';
import { Controller } from 'react-hook-form';
// import BackgroundImage from '@assets/images/background-login.png';
// import LogoImage from '@assets/images/squad-logo.png';

export default function LoginScreen() {
	const { handleLogin, control, isLoading } = useLoginViewModel();

	return (
		<BasePage type="form" padding={0}>
			<SL.Background>
				<SL.Body>
					{/* <SL.Logo source={LogoImage} /> */}
					<Controller
						control={control}
						name="login"
						render={({ field: { onChange, value }, fieldState }) => (
							<InputText label="Nickname" value={value} onChangeText={onChange} error={fieldState.error?.message} />
						)}
					/>
				</SL.Body>
				<SL.Footer>
					<ButtonBase text={'Entrar'} onPress={handleLogin} isLoading={isLoading} />
				</SL.Footer>
			</SL.Background>
		</BasePage>
	);
}
