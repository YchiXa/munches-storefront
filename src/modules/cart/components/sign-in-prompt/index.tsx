import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-cream rounded-2xl flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Уже есть аккаунт?
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          Войдите для более удобных покупок.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            Войти
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
