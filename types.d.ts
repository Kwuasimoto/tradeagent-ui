import {FormControl} from "@angular/forms";
import {NavigationExtras} from "@angular/router";
import { MarketApiConfigurationTypes, MarketClientConfigurationTypes } from "./libs/services/src";
import { MarketProviderInformation } from "./apps/tradeagent-ui/src/app/components";
import { SafeUrl } from "@angular/platform-browser";

declare module 'faye-websocket';

export type MessageContext = string | number | object

export interface User {
  id?: string,
  name: string,
  email: string,
  password: string,
  createdAt: string,
}

export interface Auth {
  userID?: string
}

export interface LoginForm {
  username: FormControl<string | null>
  password: FormControl<string | null>
}

export interface RegisterForm extends LoginForm {
  email: FormControl<string | null>
}

export interface HTMLAnchorLink {
  navCommand: string[],
  navOpts: NavigationExtras,
  label: string,
  matIcon?: string,
}

export interface MarketClientConfiguration {
  name: string,
  id: string,
  clientID: number
  host: string
  port: number
  type: MarketClientConfigurationTypes,
  isActive?: boolean
}

export type MarketClientTableDatum = MarketClientConfiguration & Pick<MarketProviderInformation, "providerBrandLogoBase64" | "provider" | "providerWebsite">
export interface MarketApiConfiguration {
  id: string
  name: string
  apiKey: string
  type: MarketApiConfigurationTypes
  marketApiStatus: MarketApiStatus
  canQuery?: boolean
  isReady?: boolean
}
export type MarketApiTableDatum = MarketApiConfiguration & Pick<MarketProviderInformation, "providerBrandLogoBase64" | "provider" | "providerWebsite">
export type MarketApiConfigurationFormProps = Pick<MarketApiConfiguration, "apiKey" | "type" | "name">
export type MarketApiConfigurationForm = {
  [P in keyof MarketApiConfigurationFormProps]: FormControl<MarketApiConfigurationFormProps[P] | null>
}
export interface MarketProviderInformation {
  // The name of the client
  provider: string,
  // Name for fetching logo from database
  providerBrandLogoName: string

  // Data for dynamically fetching the image if it's not found in the database
  providerWebsite: string,
  providerBrandLogoSelector: string,
  providerBrandLogoBase64?: SafeUrl,
  providerType: MarketClientConfigurationTypes | MarketApiConfigurationTypes
}

export interface MarketApiStatus {
  market: string
  serverTime: string
  exchanges: ExchangeStatus
  currencies: CurrencyStatus
}

export interface ExchangeStatus {
  nyse: string
  nasdaq: string
  otc: string
}

export interface CurrencyStatus {
  fx: string
  crypto: string
}

export interface EditConfigurationProps {
  type?: MarketClientConfigurationTypes | MarketApiConfigurationTypes,
  isEditing: boolean,
  clientData?: MarketProviderInformation
}
