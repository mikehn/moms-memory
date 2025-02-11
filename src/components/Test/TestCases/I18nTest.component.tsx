import { TestBox } from '../Test.component'
import { i18nKeys } from '@/assets/i18n/keys'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@radix-ui/react-dropdown-menu'
import { Globe, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../ui/button'
import { languagesList } from '../../../utils/consts/lang.consts'

const I18nTest = () => {
  const { t } = useTranslation()
  return (
    <TestBox
      title="I18n Test"
      description="test that I18n can translate correctly"
    >
      <div className="mb-2 font-semibold">
        Translation : {t(i18nKeys.test.hello)}
      </div>
      <LanguageSwitcher />
    </TestBox>
  )
}

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const languages = languagesList

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-auto gap-2 px-3">
          <Globe className="size-4" />
          <span className="hidden sm:inline-block">
            {languages.find((lang) => lang.code === i18n.language)?.label ||
              'Language'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 rounded-md border border-slate-200 bg-white p-1"
        align="start"
        sideOffset={4}
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageSelect(language.code)}
            className="flex cursor-pointer items-center justify-between"
          >
            <span>{language.label}</span>
            {i18n.language === language.code && (
              <Check className="size-4 text-green-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default I18nTest
