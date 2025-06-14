
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://axcntrseziaadllrtphj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4Y250cnNlemlhYWRsbHJ0cGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4NjE1MjcsImV4cCI6MjA2NTQzNzUyN30.r_Wd6wYxtSEtzRtJOmahTC-1Cr3gvQNMtmHxWwhTpX4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
