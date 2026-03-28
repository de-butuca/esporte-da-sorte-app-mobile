package com.brcneto.edscript

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Build
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BannerNotificationModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val CHANNEL_ID = "promo-banner"
        private const val CHANNEL_NAME = "Promoções"
        private const val NOTIFICATION_ID = 9001
        private const val PREFS_NAME = "banner_notification"
        private const val KEY_PENDING_ROULETTE = "pending_roulette"
    }

    override fun getName() = "BannerNotification"

    private fun ensureChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Notificações promocionais com banner"
            }
            val nm = reactContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            nm.createNotificationChannel(channel)
        }
    }

    @ReactMethod
    fun show(title: String, body: String) {
        ensureChannel()

        val banner = BitmapFactory.decodeResource(
            reactContext.resources,
            R.drawable.notification_banner
        )

        val smallIconId = try {
            val field = R.drawable::class.java.getField("notification_icon")
            field.getInt(null)
        } catch (_: Exception) {
            reactContext.applicationInfo.icon
        }

        reactContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
            .edit()
            .putBoolean(KEY_PENDING_ROULETTE, true)
            .apply()

        val launchIntent = reactContext.packageManager
            .getLaunchIntentForPackage(reactContext.packageName)?.apply {
                addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP)
            }

        val pendingIntent = PendingIntent.getActivity(
            reactContext, NOTIFICATION_ID, launchIntent!!,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val builder = NotificationCompat.Builder(reactContext, CHANNEL_ID)
            .setSmallIcon(smallIconId)
            .setColor(0xFF023697.toInt())
            .setContentTitle(title)
            .setContentText(body)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)

        if (banner != null) {
            builder.setLargeIcon(banner)
            builder.setStyle(
                NotificationCompat.BigPictureStyle()
                    .bigPicture(banner)
                    .bigLargeIcon(null as Bitmap?)
            )
        }

        val nm = reactContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        nm.notify(NOTIFICATION_ID, builder.build())
    }

    @ReactMethod
    fun consumePendingAction(promise: Promise) {
        val prefs = reactContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val pending = prefs.getBoolean(KEY_PENDING_ROULETTE, false)
        if (pending) {
            prefs.edit().remove(KEY_PENDING_ROULETTE).apply()
        }
        promise.resolve(pending)
    }
}
