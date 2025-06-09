import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AccessibleFormField } from './AccessibleFormField';
import { useFormValidation } from './FormValidation';
import { useEnhancedAlerts, supabaseAlertHelpers } from './EnhancedAlertSystem';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Settings, 
  LogOut, 
  Upload,
  Edit,
  Check,
  X
} from 'lucide-react';

interface UserProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'enterprise';
  joinedDate: string;
  lastLogin: string;
  isEmailVerified: boolean;
}

interface UserProfileProps {
  user?: UserProfileData;
  onLogout?: () => void;
  onSettingsClick?: () => void;
  onPasswordChange?: () => void;
  className?: string;
}

export const UserProfile = ({
  user = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    plan: 'free',
    joinedDate: '2024-01-15',
    lastLogin: '2025-06-09',
    isEmailVerified: true
  },
  onLogout,
  onSettingsClick,
  onPasswordChange,
  className = ""
}: UserProfileProps) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { addAlert } = useEnhancedAlerts();

  const fieldConfigs = {
    firstName: {
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
      rules: {
        required: true,
        minLength: 2
      }
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      rules: {
        required: true,
        minLength: 2
      }
    },
    email: {
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email address',
      rules: {
        required: true,
        email: true
      }
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit
  } = useFormValidation(fieldConfigs, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });

  const handleProfileUpdate = async (formData: any) => {
    // This will be connected to Supabase
    console.log('Updating profile:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addAlert(supabaseAlertHelpers.dataSuccess('update', 'user profile'));
    setIsEditingProfile(false);
  };

  const handleAvatarUpload = () => {
    // This will be connected to Supabase storage
    addAlert({
      type: 'info',
      title: 'Coming Soon',
      message: 'Avatar upload will be available after Supabase integration',
      source: 'general'
    });
  };

  const handleCancelEdit = () => {
    // Reset form values to original user data
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
    setValue('email', user.email);
    setIsEditingProfile(false);
  };

  const getInitials = () => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'pro': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'enterprise': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Profile Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" aria-hidden="true" />
            My Profile
          </CardTitle>
          <CardDescription>
            Manage your account information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
              </Avatar>
              <EnhancedButton
                variant="outline"
                size="sm"
                onClick={handleAvatarUpload}
                className="text-xs"
              >
                <Upload className="h-3 w-3 mr-1" aria-hidden="true" />
                Upload Photo
              </EnhancedButton>
            </div>

            <div className="flex-1 space-y-4">
              {!isEditingProfile ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {user.firstName} {user.lastName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <span className="text-muted-foreground">{user.email}</span>
                        {user.isEmailVerified && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" aria-hidden="true" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <EnhancedButton
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingProfile(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                      Edit Profile
                    </EnhancedButton>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>Joined {formatDate(user.joinedDate)}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1">
                      <span>Last login {formatDate(user.lastLogin)}</span>
                    </div>
                  </div>

                  <Badge className={getPlanColor(user.plan)}>
                    {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                  </Badge>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(handleProfileUpdate);
                  }}
                  className="space-y-4"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AccessibleFormField
                      name="firstName"
                      config={fieldConfigs.firstName}
                      value={values.firstName}
                      onChange={(value) => setValue('firstName', value)}
                      onBlur={() => setFieldTouched('firstName')}
                      error={touched.firstName ? errors.firstName : undefined}
                      disabled={isSubmitting}
                    />
                    <AccessibleFormField
                      name="lastName"
                      config={fieldConfigs.lastName}
                      value={values.lastName}
                      onChange={(value) => setValue('lastName', value)}
                      onBlur={() => setFieldTouched('lastName')}
                      error={touched.lastName ? errors.lastName : undefined}
                      disabled={isSubmitting}
                    />
                  </div>

                  <AccessibleFormField
                    name="email"
                    config={fieldConfigs.email}
                    value={values.email}
                    onChange={(value) => setValue('email', value)}
                    onBlur={() => setFieldTouched('email')}
                    error={touched.email ? errors.email : undefined}
                    disabled={isSubmitting}
                  />

                  <div className="flex gap-3 pt-2">
                    <EnhancedButton
                      type="submit"
                      loading={isSubmitting}
                      loadingText="Saving..."
                      disabled={isSubmitting}
                    >
                      <Check className="h-4 w-4 mr-2" aria-hidden="true" />
                      Save Changes
                    </EnhancedButton>
                    <EnhancedButton
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4 mr-2" aria-hidden="true" />
                      Cancel
                    </EnhancedButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" aria-hidden="true" />
            Account Actions
          </CardTitle>
          <CardDescription>
            Manage your account security and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EnhancedButton
              variant="outline"
              onClick={onPasswordChange}
              className="justify-start h-auto p-4"
            >
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 mt-0.5 text-muted-foreground" aria-hidden="true" />
                <div className="text-left">
                  <div className="font-medium">Change Password</div>
                  <div className="text-sm text-muted-foreground">Update your account password</div>
                </div>
              </div>
            </EnhancedButton>

            <EnhancedButton
              variant="outline"
              onClick={onSettingsClick}
              className="justify-start h-auto p-4"
            >
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 mt-0.5 text-muted-foreground" aria-hidden="true" />
                <div className="text-left">
                  <div className="font-medium">Account Settings</div>
                  <div className="text-sm text-muted-foreground">Manage preferences and billing</div>
                </div>
              </div>
            </EnhancedButton>
          </div>

          <Separator />

          <EnhancedButton
            variant="destructive"
            onClick={onLogout}
            className="w-full md:w-auto"
          >
            <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
            Sign Out
          </EnhancedButton>
        </CardContent>
      </Card>
    </div>
  );
};
