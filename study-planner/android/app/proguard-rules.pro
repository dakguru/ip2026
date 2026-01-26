# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in D:\IP 2026\study-planner\android\app/proguard-rules.pro.

# Capacitor
-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }

# Proguard rules for Capacitor Plugins
-keep public class * extends com.getcapacitor.Plugin

# Razorpay ProGuard Rules
-keepattributes Signature
-keepattributes *Annotation*
-dontwarn com.razorpay.**
-keep class com.razorpay.** {*;}
-optimizations !method/inlining/*
-keepclasseswithmembers class * {
  public void onPayment*(...);
}
