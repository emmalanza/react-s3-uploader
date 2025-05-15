# Practica de integración con AWS S3

Este proyecto es un ejercicio **para practicar** el uso de AWS S3 desde una aplicación web usando claves de acceso.

---

## 🚧 Advertencia importante

- **Este proyecto NO está pensado para usarse en producción.**  
- Las claves de AWS (Access Key, Secret Key, Session Token) están usadas directamente en el frontend para fines de aprendizaje, lo cual **no es seguro** y no se recomienda bajo ninguna circunstancia en aplicaciones reales.  
- En un entorno real, la gestión de credenciales debe realizarse en un backend seguro o usando mecanismos de autenticación y autorización adecuados (ej. AWS Cognito, roles con permisos limitados, servidores proxy).  

---

## ¿Qué hace este ejercicio?

- Permite subir, ver y borrar imágenes en un bucket de AWS S3.  
- Configura una política CORS para que la aplicación frontend pueda comunicarse con el bucket.  
- Muestra cómo usar variables de entorno (`.env`) para configurar las credenciales.  

---

## Uso local y despliegue

- En local, las variables de entorno se leen desde el archivo `.env`.  
- En despliegue, las variables se configuran a través del pipeline (por ejemplo, GitHub Actions).  
- Recuerda que las claves que uses deben tener permisos adecuados y estar activas.  

---

## Mejoras recomendadas para producción

- Nunca exponer claves AWS directamente en el frontend.  
- Usar roles y políticas de AWS con permisos mínimos.  
- Implementar backend que maneje las operaciones seguras con S3.  
- Usar autenticación para validar usuarios.  

---

