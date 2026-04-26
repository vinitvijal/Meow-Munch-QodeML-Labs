import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 flex items-center justify-between gap-4">
      <div>
        <Heading level="h2" className="text-xl font-bold text-gray-900">
          Already a pantry member?
        </Heading>
        <Text className="text-sm text-gray-500 mt-1">
          Sign in to access your saved addresses and faster checkout.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-11 px-6 rounded-xl border-gray-200 hover:bg-white hover:border-orange-200 hover:text-orange-600 transition-all active:scale-95" data-testid="sign-in-button">
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
