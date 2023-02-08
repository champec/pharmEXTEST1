import { createClient } from '@supabase/supabase-js'

//initiate a supabase project for organisations
const supabaseOrgUrl = process.env.REACT_APP_SUPABASE_URL_ORG
const supabaseOrgAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY_ORG

export const supabasePharmacyClient = createClient(supabaseOrgUrl, supabaseOrgAnonKey)


//initiate a supabase project for users

const supabaseUserUrl = process.env.REACT_APP_SUPABASE_URL_USER
const supabaseUserAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY_USER


export const supabaseUserClient = createClient(supabaseUserUrl, supabaseUserAnonKey)




